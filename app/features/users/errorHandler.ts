import { toast } from 'sonner';

import { ErrorMessages } from '@lib/errors';

type AvatarErrorCode =
    | typeof ErrorMessages.USER.AVATAR.SIZE
    | typeof ErrorMessages.USER.AVATAR.INVALID_TYPE
    | typeof ErrorMessages.USER.AVATAR.NO_IMAGE
    | typeof ErrorMessages.USER.AVATAR.NO_DELETE_IMAGE;

const AVATAR_ERROR_MESSAGES: Record<AvatarErrorCode, string> = {
    [ErrorMessages.USER.AVATAR.SIZE]: 'File size must be less than 2MB',
    [ErrorMessages.USER.AVATAR.INVALID_TYPE]:
        'Invalid file type. Only JPEG, PNG, and WebP are allowed',
    [ErrorMessages.USER.AVATAR.NO_IMAGE]: 'Avatar file is required',
    [ErrorMessages.USER.AVATAR.NO_DELETE_IMAGE]: 'No avatar to delete',
};

export const handleAvatarError = (error: unknown) => {
    const code = (error as any)?.response?.data?.error;

    if (code && code in AVATAR_ERROR_MESSAGES) {
        toast.error(AVATAR_ERROR_MESSAGES[code as AvatarErrorCode]);

        return;
    }

    toast.error('Something went wrong. Please try again.');
};
