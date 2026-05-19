import { toast } from 'sonner';

import { ErrorMessages } from '@lib/errors';

type AuthErrorCode =
    | typeof ErrorMessages.AUTH.USER_EXIST
    | typeof ErrorMessages.AUTH.USER_NOT_EXIST
    | typeof ErrorMessages.AUTH.INVALID_PASSWORD;

const AUTH_ERROR_MESSAGES: Record<AuthErrorCode, string> = {
    [ErrorMessages.AUTH.USER_EXIST]:
        'You already have an account with this email. Try signing in instead.',

    [ErrorMessages.AUTH.USER_NOT_EXIST]:
        'We couldn’t find an account with that email. You can sign up instead.',

    [ErrorMessages.AUTH.INVALID_PASSWORD]: 'Incorrect email or password. Please try again.',
};

export const handleAuthError = (error: unknown) => {
    const code = (error as any)?.response?.data?.error;

    if (code && code in AUTH_ERROR_MESSAGES) {
        toast.error(AUTH_ERROR_MESSAGES[code as AuthErrorCode]);

        return;
    }

    toast.error('Something went wrong. Please try again.');
};
