# Frontend Chatbot Plan

## Strategy

1. Create chat UI component
2. Manage message list state
3. Send user input to backend API
4. Receive AI response
5. Render assistant messages
6. Persist conversation_id in frontend state
7. Handle loading and error states

---

## API Communication Flow

- User submits message
- Frontend sends:
  - message
  - conversation_id (if exists)
- Backend returns:
  - response
  - conversation_id
- Frontend updates chat UI

---

## UI Integration

- Chatbox placed inside existing layout
- No global theme changes
- Mobile responsive layout
