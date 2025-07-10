// app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/auth"; // Refers to your configured auth.ts

export const { GET, POST } = handlers;


