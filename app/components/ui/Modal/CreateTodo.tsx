'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Resolver, useForm } from 'react-hook-form';

import { useAppDispatch } from '@app/store';
import { closeModal } from '@app/store/modals/slice';
import { useGetTodoTypes } from '@features/todo-types/hooks';
import { useCreateTodo } from '@features/todos/hooks';
import { TodoStatus } from '@features/todos/types';
import { CreateTodoFormData, CreateTodoSchema } from '@features/todos/validation';

import { CommonSelect, Option } from '@components/ui/CommonSelect';
import { CommonTextarea } from '@components/ui/CommonTextarea';
import { DatePickerField } from '@components/ui/DatePickerField';
import { FormInput } from '@components/ui/FormInput';
import { ModalCommonWrapper } from '@components/ui/Modal/CommonWrapper';

const statusOptions: Option<CreateTodoFormData['status']>[] = [
    { label: 'Todo', value: 'todo' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Done', value: 'done' },
];

export const CreateTodo = () => {
    const dispatch = useAppDispatch();

    const { mutateAsync, isPending } = useCreateTodo();

    const { data: types = [] } = useGetTodoTypes();

    const typeOptions = types.map(type => ({
        label: type.name,
        value: type.id,
    }));

    const {
        setValue,
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<CreateTodoFormData>({
        resolver: zodResolver(CreateTodoSchema) as Resolver<CreateTodoFormData>,
        defaultValues: {
            title: '',
            description: '',
            status: 'todo' as TodoStatus,
            type_id: 0,
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

    useEffect(() => {
        if (types.length > 0) {
            setValue('type_id', types[0].id);
        }
    }, [types, setValue]);

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

                <CommonSelect label="Type" options={typeOptions} register={register('type_id')} />

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
