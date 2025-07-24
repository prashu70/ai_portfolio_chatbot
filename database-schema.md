# Database Schema Design

## Portfolio Data Tables

### User Profile
```sql
model User {
  id          String   @id @default(cuid())
  name        String
  title       String
  email       String   @unique
  bio         String?
  avatar      String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  skills      Skill[]
  experiences Experience[]
  projects    Project[]
  conversations Conversation[]
}
```

### Skills
```sql
model Skill {
  id       String @id @default(cuid())
  name     String
  category String
  level    String // Beginner, Intermediate, Advanced, Expert
  userId   String
  user     User   @relation(fields: [userId], references: [id])
}
```

### Experience
```sql
model Experience {
  id          String   @id @default(cuid())
  company     String
  position    String
  duration    String
  description String
  startDate   DateTime?
  endDate     DateTime?
  current     Boolean  @default(false)
  userId      String
  user        User     @relation(fields: [userId], references: [id])
}
```

### Projects
```sql
model Project {
  id           String   @id @default(cuid())
  name         String
  description  String
  technologies String[] // Array of technology names
  githubUrl    String?
  liveUrl      String?
  imageUrl     String?
  featured     Boolean  @default(false)
  createdAt    DateTime @default(now())
  userId       String
  user         User     @relation(fields: [userId], references: [id])
}
```

## Chat System Tables

### Conversations
```sql
model Conversation {
  id        String   @id @default(cuid())
  sessionId String   @unique
  userId    String?
  user      User?    @relation(fields: [userId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  messages  Message[]
}
```

### Messages
```sql
model Message {
  id             String       @id @default(cuid())
  content        String
  role           MessageRole  // USER, ASSISTANT
  timestamp      DateTime     @default(now())
  conversationId String
  conversation   Conversation @relation(fields: [conversationId], references: [id])
}

enum MessageRole {
  USER
  ASSISTANT
}
```

## Key Features:
1. **User Profile**: Stores basic portfolio information
2. **Skills**: Categorized skills with proficiency levels
3. **Experience**: Work history with detailed descriptions
4. **Projects**: Portfolio projects with technologies and links
5. **Conversations**: Chat sessions for tracking user interactions
6. **Messages**: Individual chat messages with roles (user/assistant)

## Relationships:
- One User has many Skills, Experiences, Projects, and Conversations
- One Conversation has many Messages
- Messages belong to a Conversation and have a role (USER/ASSISTANT)

