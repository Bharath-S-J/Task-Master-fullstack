require("dotenv").config();
const admin = require("firebase-admin");
const { sendReminderEmail } = require("./mailer");
const path = require("path");

const serviceAccount = require(path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const checkedSet = new Set();

const checkReminders = async () => {
  console.log("Checking reminders...");

  try {
    const snapshot = await db.collection("todos").get();
    const now = Date.now();

    for (const doc of snapshot.docs) {
      const data = doc.data();
      const { reminderAt, title, userId, description } = data;

      if (!reminderAt || !userId) continue;

      const reminderTime = reminderAt.toDate().getTime();
      const diff = reminderTime - now;

      if (Math.abs(diff) <= 30000 && !checkedSet.has(doc.id)) {
        // Get user info
        const userDoc = await admin.auth().getUser(userId).catch(() => null);
        const userEmail = userDoc?.email;

        if (!userEmail) continue;

        const subject = `Reminder: ${title}`;
        const message = `Your task "${title}" is due soon.\n\nDescription: ${description || "No description."}`;

        await sendReminderEmail(userEmail, subject, message);
        checkedSet.add(doc.id);
      }

      // Cleanup expired IDs from memory every 5 minutes
      if (checkedSet.size > 1000 && now % (5 * 60 * 1000) < 60000) {
        checkedSet.clear();
      }
    }
  } catch (err) {
    console.error("Reminder check failed:", err);
  }
};

setInterval(checkReminders, 60 * 1000); // every minute

const PORT = process.env.PORT || 3000;
require("http").createServer().listen(PORT, () =>
  console.log(`Reminder service running on port ${PORT}`)
);
