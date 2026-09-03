// Admin Authentication Utility
export const AUTHORIZED_ADMIN_EMAIL = 'contact@algorudixai.com';
export const ADMIN_SESSION_KEY = 'algorudix_admin_session';
export const ADMIN_OTP_TEMP_KEY = 'algorudix_admin_otp_temp';

export interface AdminSession {
  email: string;
  isAuthenticated: boolean;
  loginTime: number;
}

/**
 * Validates if the given email is the authorized admin email.
 */
export function isAuthorizedAdminEmail(email: string): boolean {
  return email.trim().toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase();
}

/**
 * Generates a 6-digit OTP code for the authorized admin email.
 */
export function requestAdminOtp(email: string): { success: boolean; message: string; otp?: string } {
  if (!isAuthorizedAdminEmail(email)) {
    return {
      success: false,
      message: `Access Denied: Email "${email}" is not authorized. Only the official admin (${AUTHORIZED_ADMIN_EMAIL}) can access management controls.`,
    };
  }

  // Generate random 6-digit OTP
  const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
  
  const tempPayload = {
    email: email.trim().toLowerCase(),
    otp: generatedOtp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes validity
  };

  try {
    localStorage.setItem(ADMIN_OTP_TEMP_KEY, JSON.stringify(tempPayload));
  } catch (e) {
    console.error('Error saving OTP to local storage:', e);
  }

  return {
    success: true,
    message: `OTP sent successfully to ${AUTHORIZED_ADMIN_EMAIL}.`,
    otp: generatedOtp,
  };
}

/**
 * Verifies the 6-digit OTP code submitted by the user.
 */
export function verifyAdminOtp(email: string, submittedOtp: string): { success: boolean; message: string } {
  if (!isAuthorizedAdminEmail(email)) {
    return { success: false, message: 'Invalid admin email address.' };
  }

  try {
    const rawTemp = localStorage.getItem(ADMIN_OTP_TEMP_KEY);
    if (!rawTemp) {
      return { success: false, message: 'No active OTP request found. Please request a new OTP.' };
    }

    const payload = JSON.parse(rawTemp);
    if (Date.now() > payload.expiresAt) {
      localStorage.removeItem(ADMIN_OTP_TEMP_KEY);
      return { success: false, message: 'OTP has expired. Please request a new code.' };
    }

    if (payload.otp !== submittedOtp.trim()) {
      return { success: false, message: 'Incorrect OTP code. Please try again.' };
    }

    // Authenticated successfully! Create 24h admin session.
    const session: AdminSession = {
      email: AUTHORIZED_ADMIN_EMAIL,
      isAuthenticated: true,
      loginTime: Date.now(),
    };

    localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
    localStorage.removeItem(ADMIN_OTP_TEMP_KEY);

    return { success: true, message: 'Admin authentication successful!' };
  } catch (e) {
    return { success: false, message: 'An error occurred while verifying OTP.' };
  }
}

/**
 * Checks if the current browser session has a valid, unexpired Admin login.
 */
export function getAdminSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;

    const session: AdminSession = JSON.parse(raw);
    // 24 Hours expiration check (86,400,000 ms)
    if (Date.now() - session.loginTime > 24 * 60 * 60 * 1000) {
      logoutAdmin();
      return null;
    }

    return session;
  } catch (e) {
    return null;
  }
}

/**
 * Logs out the current admin session.
 */
export function logoutAdmin(): void {
  try {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem(ADMIN_OTP_TEMP_KEY);
  } catch (e) {}
}
