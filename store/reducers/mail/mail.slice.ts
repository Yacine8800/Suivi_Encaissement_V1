// store/reducers/mail/mail.slice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_AUTH_SUIVI } from "@/config/constants";

/**
 * Payload attendu pour l'envoi d'un email
 */
interface ISendEmailPayload {
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  text: string;
  attachments: File[];
}

/**
 * Thunk pour l'envoi d'un email
 */
export const sendEmail = createAsyncThunk(
  "mailbanq/sendEmailBanq",
  async (payload: ISendEmailPayload, { rejectWithValue }) => {
    try {
      const data = new FormData();

      payload.to.forEach((email) => {
        data.append("to", email);
      });

      if (payload.cc && payload.cc.length > 0) {
        payload.cc.forEach((email) => {
          data.append("cc", email);
        });
      }

      if (payload.bcc && payload.bcc.length > 0) {
        payload.bcc.forEach((email) => {
          data.append("bcc", email);
        });
      }
      data.append("subject", payload.subject);
      data.append("text", payload.text);

      payload.attachments.forEach((file) => {
        data.append("attachments", file);
      });

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${API_AUTH_SUIVI}/mail/send`,
        headers: {},
        data,
      };

      const response = await axios.request(config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Erreur lors de l'envoi de l'email"
      );
    }
  }
);

/**
 * Slice Redux Toolkit pour gérer l'état d'envoi d'email
 */
const mailbanqSlice = createSlice({
  name: "mailbanq",
  initialState: {
    loading: false,
    data: null as any,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default mailbanqSlice.reducer;
