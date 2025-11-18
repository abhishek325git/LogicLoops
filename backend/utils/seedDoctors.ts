import User from "../models/User";
import DoctorProfile from "../models/DoctorProfile";

const sampleDoctors = [
  {
    name: "Dr. Anika Rao",
    email: "anika.rao@logicloops.health",
    password: "SecurePass123",
    role: "doctor",
    specialty: "Cardiology",
    contact: "+1-555-0101",
  },
  {
    name: "Dr. Karan Patel",
    email: "karan.patel@logicloops.health",
    password: "SecurePass123",
    role: "doctor",
    specialty: "Cardiology",
    contact: "+1-555-0104",
  },
  {
    name: "Dr. Miguel Santos",
    email: "miguel.santos@logicloops.health",
    password: "SecurePass123",
    role: "doctor",
    specialty: "Dermatology",
    contact: "+1-555-0102",
  },
  {
    name: "Dr. Leah Chen",
    email: "leah.chen@logicloops.health",
    password: "SecurePass123",
    role: "doctor",
    specialty: "Dermatology",
    contact: "+1-555-0105",
  },
  {
    name: "Dr. Priya Mehta",
    email: "priya.mehta@logicloops.health",
    password: "SecurePass123",
    role: "doctor",
    specialty: "General",
    contact: "+1-555-0103",
  },
  {
    name: "Dr. Daniel Brooks",
    email: "daniel.brooks@logicloops.health",
    password: "SecurePass123",
    role: "doctor",
    specialty: "General",
    contact: "+1-555-0106",
  },
];

export const seedDoctors = async (): Promise<void> => {
  let created = 0;
  for (const doc of sampleDoctors) {
    let user = await User.findOne({ email: doc.email });
    if (!user) {
      user = await new User(doc).save();
      created += 1;
    }
    await DoctorProfile.findOneAndUpdate(
      { userId: user._id },
      { specialty: doc.specialty, contact: doc.contact },
      { upsert: true }
    );
  }
  if (created > 0) {
    console.log(`Seeded ${created} default doctor account(s).`);
  }
};

