# Preventive Care & Wellness Portal (Hackathon MVP)

Healthcare teams need a lightweight portal that keeps patients on track with preventive care goals while giving providers compliance visibility. This README outlines the proposed Minimum Viable Product (MVP) for the first round of judging. It focuses on solution flow, MERN stack choices, UI/UX, data models, and API contracts—no code is required yet.

---

## 1. Business Context & Objectives
- **Problem**: Patients miss preventive checkups and healthy habit goals because they lack a unified, privacy-aware experience to track progress and receive reminders; providers lack real-time compliance insight.
- **Goal**: Deliver a secure, personalized portal that motivates patients, surfaces preventive care schedules, and equips providers with compliance dashboards.
- **MVP Focus (5-hour scope)**: Demonstrate key flows—authentication, goal tracking, compliance logging, reminders, and privacy controls.

---

## 2. Target Users & Journeys
- **Patient**: Registers with consent, views assigned wellness goals, logs progress (steps, water intake, checkups), receives reminders, and shares data with providers.
- **Provider**: Authenticates with elevated permissions, reviews patient compliance summaries, schedules preventive checkups, and updates plan notes.
- **Admin/Public**: Reads static public health information and manages content (future scope).

### High-Level Flow
1. Patient signs up, consents to data usage, and completes profile.
2. System assigns preventive goals (auto or provider-defined) and exposes them in patient dashboard.
3. Patient logs progress; system records time-series metrics and compliance.
4. Reminders (upcoming tests, vaccines) trigger notifications and surface on dashboard.
5. Provider views compliance dashboard, filters by patient, and records checkup outcomes.
6. Security layer enforces role-based access, audit logging, and HIPAA-aligned controls.

---

## 3. MVP Feature Scope
| Area | Patient-Facing | Provider/Platform |
| --- | --- | --- |
| Authentication | JWT-based login, consent checkbox, password reset flow | Role-based access controls (patient vs provider) |
| Dashboard | Goal progress tiles, preventive checklist (vaccines, tests), reminders | Patient compliance overview, alerts for missed milestones |
| Profile & Health Info | Editable demographics, vitals snapshot, medications, allergies, public wellness content | Provider notes, care plan metadata |
| Goal Tracker | Log steps, water intake, sleep hours; mark preventive checkups complete | Assign/approve goals, override reminders |
| Reminders | Calendar view, push/email (mock), highlight upcoming preventive actions | Configure reminder templates |
| Privacy & Security | Consent management, data download/export placeholder, audit trail | Policy & HIPAA messaging |

Out-of-scope for MVP: telehealth visits, insurance billing, detailed analytics dashboards.

---

## 4. MERN Tech Stack
| Layer | Tooling | Rationale |
| --- | --- | --- |
| Frontend | React (Next.js or CRA), TypeScript, CSS Modules/Sass | Rapid UI iterations, SEO-friendly routing, modular styling |
| Backend | Node.js + Express | Lightweight REST API, rich middleware ecosystem |
| Database | MongoDB Atlas (NoSQL) | Flexible schema for patient metrics & logs |
| Authentication | JWT (access + refresh), bcrypt for hashing | Secure stateless sessions |
| API | RESTful endpoints, OpenAPI spec | Clear contracts for future integrations |
| DevOps | GitHub Actions (CI), Vercel/Netlify (frontend), Render/Heroku (backend) | Fast deploy + automated tests |
| Security | HTTPS, environment variables, rate limiting, audit logging | HIPAA-aligned basics |

---

## 5. UI & Navigation Blueprint
- **Entry**: `/login`, `/register` with consent modal & security tips.
- **Patient Layout**:
  - `/dashboard`: Hero metrics, goal ring, preventive checklist, alerts.
  - `/goals`: Detailed habit tracker, add log modal, trend charts.
  - `/profile`: Personal info, health stats, medications/allergies, data-sharing settings.
  - `/reminders`: Calendar/timeline, snooze/confirm actions.
- **Provider Layout**:
  - `/provider/dashboard`: Patient table, compliance percentage, risk flags.
  - `/provider/patient/:id`: Goal list, latest logs, ability to assign new goals or document visits.
- **Public Page**:
  - `/wellness`: Static educational content & preventive guidelines.

UX Notes: responsive design, accessibility (WCAG AA), emphasis on personalization and trust messaging (HIPAA badges, data usage copy).

---

## 6. Data Model Draft (MongoDB Collections)
| Collection | Key Fields |
| --- | --- |
| `users` | `_id`, `email`, `passwordHash`, `role`, `consentStatus`, `lastLogin`, `multiFactorEnabled` |
| `profiles` | `userId`, `demographics`, `vitals`, `medications`, `allergies`, `emergencyContacts` |
| `wellnessGoals` | `userId`, `goalType`, `targetValue`, `frequency`, `assignedBy`, `startDate`, `endDate`, `status` |
| `goalLogs` | `goalId`, `timestamp`, `value`, `notes`, `source` (manual/wearable) |
| `preventiveChecklist` | `userId`, `itemType` (vaccine/test), `dueDate`, `status`, `providerNotes` |
| `reminders` | `userId`, `message`, `triggerDate`, `channel`, `acknowledged` |
| `auditLogs` | `userId`, `action`, `resource`, `timestamp`, `ipAddress` |

Indexes: `users.email` (unique), compound indexes on `goalLogs(goalId, timestamp)` for trend queries, TTL for audit logs if required.

---

## 7. API Contracts (Sample)
| Endpoint | Method | Description | Request | Response |
| --- | --- | --- | --- | --- |
| `/api/auth/register` | POST | Create patient/provider account | `{email, password, role, consent}` | `{token, refreshToken, user}` |
| `/api/auth/login` | POST | Authenticate & issue JWT | `{email, password}` | `{token, refreshToken}` |
| `/api/patients/:id/profile` | GET | Retrieve profile (RBAC) | JWT | `{profile, goals, checklist}` |
| `/api/goals` | POST | Create/assign goal | `{userId, goalType, targetValue, frequency}` | `{goal}` |
| `/api/goals/:goalId/logs` | POST | Record progress | `{value, notes}` | `{logEntry}` |
| `/api/reminders` | GET | List upcoming reminders | Query params (`status`) | `{reminders: []}` |
| `/api/provider/patients` | GET | Provider dashboard dataset | Filters (`compliance<80`) | `{patients: []}` |
| `/api/checklist/:id` | PATCH | Update preventive item status | `{status, providerNotes}` | `{checklistItem}` |
| `/api/audit` | GET | Admin logging view (future) | RBAC scope | `{logs: []}` |

All endpoints enforce JWT auth, role-based middleware, rate limiting, and validation (Joi/Zod). Responses follow JSON:API-style envelopes with error handling conventions (`{error: {code, message}}`).

---

## 8. Security, Privacy & Compliance
- Consent capture at registration with audit trail.
- Data encryption in transit (HTTPS/TLS) and at rest (MongoDB Atlas encryption).
- Environment variables for secrets, no secrets committed.
- Logging & monitoring: Winston/Datadog hooks for auth events and failed logins.
- Basic HIPAA safeguards: minimum necessary data exposure, role-based access, session timeout, breach notification checklist.

---

## 9. DevOps & Deployment Plan
- **Environments**: `dev` (feature branches) → `staging` (demo) → `prod` (judging).
- **CI/CD**: GitHub Actions pipeline—lint, unit tests, API contract tests, build artifacts, deploy via environments.
- **Hosting**: React frontend on Vercel/Netlify; Express API on Render/Heroku with auto-deploy hooks; MongoDB Atlas cluster.
- **Observability**: Health check endpoint, uptime monitor (e.g., UptimeRobot), structured logs shipped to a lightweight log service.

---

## 10. Next Steps Toward Full Build
1. Finalize UI wireframes and design system (colors, typography, iconography).
2. Create OpenAPI 3.0 spec & sample Postman collection for endpoints above.
3. Scaffold MERN repos with shared ESLint/Prettier configs.
4. Implement authentication + role guards, then build dashboard flows iteratively.
5. Seed database with sample patients/providers for judging demo.

This README captures the concept, architecture, and execution plan for the Preventive Care & Wellness Portal MVP. It is ready to accompany the hackathon submission for initial evaluation.


