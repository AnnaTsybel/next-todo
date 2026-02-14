'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useAppDispatch } from '@app/store';
import { closeModal } from '@app/store/modals/slice';

import { CommonSelect, Option } from '@components/ui/CommonSelect';
import { CommonTextarea } from '@components/ui/CommonTextarea';
import { DatePickerField } from '@components/ui/DatePickerField';
import { FormInput } from '@components/ui/FormInput';

import { useCreateTodo } from '@/app/features/todos/hooks';
import { TodoStatus, TodoType } from '@/app/features/todos/types';
import { CreateTodoFormData, CreateTodoSchema } from '@/app/features/todos/validation';

import { ModalCommonWrapper } from './CommonWrapper';

const statusOptions: Option<CreateTodoFormData['status']>[] = [
    { label: 'Todo', value: 'todo' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Done', value: 'done' },
];

const typeOptions: Option<CreateTodoFormData['type']>[] = [
    { label: 'Default', value: 'default' },
    { label: 'Sport', value: 'sport' },
    { label: 'Education', value: 'education' },
    { label: 'Task', value: 'task' },
];

export const CreateTodo = () => {
    const dispatch = useAppDispatch();

    const { mutateAsync, isPending } = useCreateTodo();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<CreateTodoFormData>({
        resolver: zodResolver(CreateTodoSchema),
        defaultValues: {
            title: '',
            description: '',
            status: 'todo' as TodoStatus,
            type: 'default' as TodoType,
            expired_at: '',
        },
    });

    const onSubmit = async (data: CreateTodoFormData) => {
        await mutateAsync({
            ...data,
            description: data.description ? data.description : '',
            expired_at: data.expired_at ? new Date(data.expired_at) : '',
        });

        dispatch(closeModal());
    };

    return (
        <ModalCommonWrapper title="Create Todo">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-[15px]">
                <FormInput
                    title="Title"
                    placeholder="Title"
                    register={register('title')}
                    error={errors.title}
                />

                <CommonTextarea
                    title="Description"
                    placeholder="Description"
                    register={register('description')}
                    error={errors.description}
                />

                <CommonSelect label="Type" options={typeOptions} register={register('type')} />

                <CommonSelect
                    label="Status"
                    options={statusOptions}
                    register={register('status')}
                />

                <DatePickerField label="Expires" control={control} name="expired_at" />

                <button
                    type="submit"
                    disabled={isSubmitting || isPending}
                    className="
                    w-40
                    mx-auto
                    flex
                    justify-center
                    rounded-md
                    py-2
                    text-button
                    font-semibold
                    transition
                    disabled:opacity-50
                    cursor-pointer
                    bg-accent
                "
                >
                    {isSubmitting || isPending ? 'Saving...' : 'Create Todo'}
                </button>
            </form>
        </ModalCommonWrapper>
    );
};
