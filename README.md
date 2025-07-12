# StackIt – A Smart Q&A Platform

> This project was developed as part of Odoo Hackathon 2025.StackIt is an intelligent and collaborative Q&A platform designed to enhance knowledge sharing in a structured, efficient, and engaging manner. With AI-driven duplicate detection, real-time updates, gamified reputation systems, and advanced tag management, StackIt ensures both quality and interactivity in learning communities.

📌 Problem Statement

 StackIt – Structuring Knowledge, Empowering Minds
In traditional Q&A platforms, duplicate questions, low-quality content, and poor user engagement hinder the learning experience. Moreover, lack of real-time collaboration and poor topic organization often leads to information clutter. StackIt aims to solve this by providing a smart, responsive, and structured system to streamline interactions and elevate the overall user experience.

 ✨ Key Features
🤖 1. AI-Powered Duplicate Detection & Quality Suggestions
- Detects semantically similar questions using sentence embeddings before submission.
- Prevents redundant content to maintain platform quality.
- Offers real-time suggestions for improving question phrasing.
- Uses lightweight pre-trained transformer models (e.g., all-MiniLM-L6-v2).
- Enhances user contribution quality with minimal user effort.

🏅 2. Reputation System with Badges
- Encourages user engagement through XP and level-based progression.
- Badges for milestones (e.g., First Answer, Top Voted, 100 XP).
- XP awarded for meaningful actions like upvoted answers or accepted responses.
- Visual dashboard shows earned badges and progress bar.
- Builds a gamified and rewarding ecosystem to motivate contributors.

 🔄 3. Real-Time Updates on Questions
- New answers and comments appear instantly without refreshing the page.
- Enables live collaboration on active threads.
- WebSocket integration ensures low-latency updates.
- Keeps users engaged during ongoing discussions.
- Reduces information lag and enhances user satisfaction.

🏷 4. Advanced Tag Management and Following
- Users can follow tags and receive personalized content feeds.
- Tags have structured wikis for topic clarity and learning context.
- Admins can merge, edit, or delete tags to avoid clutter.
- Auto-suggestions while tagging questions improve consistency.
- Tags improve discoverability and classification of content.

💬 5. Comment System for Questions & Answers
- Threaded discussions support clarification and collaboration.
- Helps distinguish between full answers and contextual queries.
- Admins can promote high-value comments to full answers.
- Enables community interaction without polluting the answer section.
- Complements the answer system for better communication.

🛡 6. Admin Moderation Tools
- Admins can flag, delete, or edit inappropriate questions and answers.
- Conversion of insightful comments into full answers with one click.
- Tag management (merge/edit/delete) ensures taxonomy hygiene.
- Dashboard to monitor reported content and recent activities.
- Ensures quality control and safe community interaction.

🎨 7. Intuitive and Responsive User Interface
- Clean, responsive UI built using HTML/CSS and vanilla JavaScript.
- Auto-expanding editors and live markdown preview for enhanced user experience.
- Tabbed layout for switching between answers, comments, and code editor.
- Mobile-friendly design for learning on-the-go.
- Smooth animations and real-time feedback to keep users engaged.

🧑‍🤝‍🧑 8. Collaborative Editing (Optional Extension)
- Allows multiple users to collaboratively edit a question or answer draft.
- Edit history with rollback support and change tracking.
- Lock system to prevent overwrite conflicts during concurrent edits.
- Transparent contribution tracking in shared edits.
- Promotes community-driven content improvement.

🛠 Tech Stack

- Backend: Spring Boot (Java), Spring Data JPA  
- Database: PostgreSQL  
- Frontend: HTML, CSS, JavaScript (Vanilla JS)  
- Real-Time Communication: Spring WebSockets  
- AI Integration (optional extension): Pre-trained sentence transformer via external API

👨‍💻 Team Members

- Adarsh Dubey(adarshiiitkota@gmail.com)
- Anmol Upadhyay(2023kucp1128@iiitkota.ac.in)
- Ayush Singh (bestayush3@gmail.com)
- Sauvir Wodehra(sauvirwodehras3136@gmail.com)

> Thank you for reviewing our project. We built StackIt with the vision of making structured, intelligent knowledge sharing accessible to everyone.
