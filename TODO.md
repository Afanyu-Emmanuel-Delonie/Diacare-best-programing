# DiaCare TODO

## Completed

### Auth & Core API
- [x] Fix frontend API base URL with safe fallback in `axios.js`
- [x] Update `AuthResponse` DTO to return nested `user` object matching frontend expectations
- [x] Add missing auth endpoints (`/me`, `/logout`, `/refresh`, `/forgot-password`, `/reset-password`)
- [x] Create `GlobalExceptionHandler` for structured JSON error responses
- [x] Harden frontend axios interceptor for graceful fallback
- [x] Add `/doctors/all`, `/glucose/all`, `/prescriptions/all`, `/meal-plans/all`, `/appointments/all` endpoints
- [x] Wire up admin, doctor, and patient dashboards to real APIs

### Real-Time Chat Module
- [x] Add `spring-boot-starter-websocket` dependency
- [x] Create `Conversation` and `ChatMessage` JPA entities
- [x] Create `ConversationRepository` and `ChatMessageRepository`
- [x] Create `ChatService` and `ChatServiceImpl` with full CRUD and unread count logic
- [x] Create `ChatController` with REST endpoints and STOMP `@MessageMapping`
- [x] Create `WebSocketConfig` with SockJS endpoint and JWT handshake interceptor
- [x] Whitelist `/ws/**` in `SecurityConfig` and `JwtAuthFilter`
- [x] Add `GET /chat/users` endpoint returning role-filtered list of chattable users
- [x] Add unread count endpoints (`/unread/count`, `/unread/per-conversation`)
- [x] Add SOS emergency fields (`isEmergency`, `emergencyAcknowledged`) to `ChatMessage`
- [x] Add `acknowledgeEmergency` endpoint and `getActiveEmergencies` endpoint
- [x] Create `EmergencyEscalationScheduler` — re-alerts admins every 60s for unacknowledged SOS older than 5 minutes
- [x] Create `ChatMessageResponse` and `ConversationResponse` DTOs to fix lazy-loading 400 errors
- [x] Install `@stomp/stompjs` and `sockjs-client` on the frontend
- [x] Add `global: 'globalThis'` polyfill in `vite.config.js` for `sockjs-client`
- [x] Build `ChatWindow` component with real-time STOMP subscription, date separators, read receipts
- [x] Build `ConversationList` component with last message preview and per-conversation unread badges
- [x] Build `NewChatModal` with searchable user list filtered by role
- [x] Build shared `ChatPage` component used by all three roles
- [x] Add Chat pages for admin, doctor, and patient
- [x] Add Chat route to all three role route groups in `App.jsx`
- [x] Add Chat nav item to admin, doctor, and patient nav constants
- [x] Add `useChatUnread` hook polling total unread every 30 seconds
- [x] Add red unread badge to Chat nav item in all three sidebars (collapsed icon dot + expanded pill)
- [x] Add total unread badge next to Chats title in conversation list header
- [x] Move new chat button to conversation list header (pencil icon) — removed floating action button
- [x] Make chat layout fully mobile responsive (list/chat panel toggle with back arrow)
- [x] Fix WebSocket message filter to use flat `conversationId` from response DTO
- [x] Fix read receipt ticks to handle both `read` and `isRead` Jackson serialisation variants
- [x] Fix SOS bubble tail colour to match red bubble background
- [x] Update `PROJECT_DOCUMENTATION.md` with chat module documentation
- [x] Update `STUDENT_MANUAL.md` with chat module explained in simple terms

## Remaining / Future Work

- [ ] Push notifications when the browser tab is not active (Web Push API)
- [ ] Message search within a conversation
- [ ] File and image attachments in chat
- [ ] Doctor can initiate SOS escalation on behalf of a patient
- [ ] Admin dashboard widget showing count of active SOS emergencies
- [ ] End-to-end tests for the WebSocket chat flow
- [ ] Rate limiting on the chat send endpoint to prevent spam
