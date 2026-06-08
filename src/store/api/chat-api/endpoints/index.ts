import chatsApi from '../index';

export interface ChatType {
  id: string;
  name: string;
  createTime: string;
  messageCount: number;
}
export interface AIResponse {
  reply: string;
  sessionId: string | null; // Всегда присутствует, может быть null
  error?: string;
}
export interface ChatHistoryResponse {
  sessionId: string;
  history: Array<{
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: string; // Формат ISO string
  }>;
}

const chatsApiEndpoints = chatsApi
  .enhanceEndpoints({
    addTagTypes: ['Chats'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getChatHistory: builder.mutation<ChatHistoryResponse, string>({
        query: (sessionId) => ({
          url: `chat/session/${sessionId}/history`,
          method: 'GET',
        }),
        invalidatesTags: ['Chats'],
      }),
      getChatList: builder.mutation<ChatType[], number>({
        query: (userId) => ({
          url: `chat/user/${userId}/sessions`,
          method: 'GET',
        }),
        invalidatesTags: ['Chats'],
      }),
      clearChatHistory: builder.mutation<{ message: string }, string>({
        query: (sessionId) => ({
          url: `chat/session/${sessionId}/clear`,
          method: 'POST',
        }),
        invalidatesTags: ['Chats'],
      }),
      sendMessage: builder.mutation<AIResponse, { question: string; sessionId: string | null; }>({
        query: (data) => ({
          url: 'chat/ask',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Chats'],
      }),
      createSession: builder.mutation<{ sessionId: string }, number>({
        query: (userId) => ({
          url: 'chat/session',
          method: 'POST',
          body: { userId },
        }),
        invalidatesTags: ['Chats'],
      }),
    }),
  });

export const {
  useGetChatHistoryMutation,
  useGetChatListMutation,
  useClearChatHistoryMutation,
  useSendMessageMutation,
  useCreateSessionMutation,
} = chatsApiEndpoints;
export { chatsApiEndpoints };
