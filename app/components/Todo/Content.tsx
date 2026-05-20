'use client';

import { ArrowLeft, Trash } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useGetTodoTypes } from '@features/todo-types/hooks';
import { useDeleteTodo, useGetTodoById, useUpdateTodo } from '@features/todos/hooks';
import { RedirectedFrom, TodoStatus } from '@features/todos/types';
import { UpdateTodoFormData } from '@features/todos/validation';

import { CommonSelect, Option } from '@components/ui/CommonSelect';
import { CommonTextarea } from '@components/ui/CommonTextarea';
import { DatePickerField } from '@components/ui/DatePickerField';
import { FormInput } from '@components/ui/FormInput';
import { Loader } from '@components/ui/Loader';

type Props = {
    id: string;
    from?: RedirectedFrom;
};

const statusOptions: Option<UpdateTodoFormData['status']>[] = [
    { label: 'Todo', value: 'todo' },
    { label: 'In Progress', value: 'in_progress' },
    { label: 'Done', value: 'done' },
];

export const TodoContent = ({ id, from = 'dashboard' }: Props) => {
    const router = useRouter();

    const { data: todo, isLoading } = useGetTodoById(id);
    const { mutate: updateTodo, isPending } = useUpdateTodo();
    const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();
    const { data: types = [], isLoading: isTypesLoading } = useGetTodoTypes();

    const typeOptions = types.map(type => ({
        label: type.name,
        value: type.id,
    }));

    const backUrl = from === 'dashboard' ? '/' : '/tasks';

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors, isSubmitting },
    } = useForm<UpdateTodoFormData>({
        defaultValues: {
            title: '',
            description: '',
            status: 'todo' as TodoStatus,
            type_id: 0,
            expired_at: new Date().toISOString(),
        },
    });

    useEffect(() => {
        if (todo && types.length > 0) {
            reset({
                title: todo.title,
                description: todo.description,
                type_id: todo.type.id,
                status: todo.status,
                expired_at: todo.expired_at.toLocaleString(),
            });
        }
    }, [todo, types, reset]);

    const onSubmit = (data: UpdateTodoFormData) => {
        if (!todo) return;

        updateTodo({
            id: todo.id,
            title: data.title,
            description: data.description,
            type_id: data.type_id,
            status: data.status,
            expired_at: data.expired_at,
        });
    };

    const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        deleteTodo(id);
        router.push(backUrl);
    };

    if (isLoading || !todo || isTypesLoading) return <Loader />;

    return (
        <div className="relative flex min-h-screen items-center justify-center px-4 z-10">
            <Link href={backUrl} className="fixed top-20 left-4 z-50 md:left-10">
                <ArrowLeft />
            </Link>
            <div className="w-full max-w-md p-6 rounded-2xl shadow bg-card relative">
                <div className="absolute right-10 flex items-center gap-2 text-xs">
                    <span>
                        <span className="font-semibold">Created:</span>{' '}
                        {new Date(todo.created_at).toLocaleDateString()}
                    </span>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="
                            rounded-md px-1 py-0.5
                            text-danger hover:text-danger
                            hover:bg-red-100
                            disabled:opacity-50
                            transition
                            cursor-pointer
                        "
                    >
                        <Trash size={16} />
                    </button>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-[15px] max-w-2xl mx-auto p-6"
                >
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
                    <CommonSelect
                        label="Type"
                        options={typeOptions}
                        register={register('type_id')}
                    />
                    <CommonSelect
                        label="Status"
                        options={statusOptions}
                        register={register('status')}
                    />
                    <DatePickerField label="Expires" control={control} name="expired_at" />
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-40 mx-auto flex justify-center rounded-md py-2 text-button font-semibold transition disabled:opacity-50 cursor-pointer bg-accent"
                    >
                        {isSubmitting || isPending ? 'Saving...' : 'Save'}
                    </button>
                </form>
            </div>
        </div>
    );
};
