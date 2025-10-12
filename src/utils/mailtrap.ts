import { MailtrapClient } from "mailtrap";

const TOKEN = process.env.MAILTRAP_TOKEN_API as string;
const TEST_INBOX_ID = process.env.MAILTRAP_TEST_INBOX_API as string;

export const mailtrap = new MailtrapClient({
  token: TOKEN,
  testInboxId: Number(TEST_INBOX_ID),
});
