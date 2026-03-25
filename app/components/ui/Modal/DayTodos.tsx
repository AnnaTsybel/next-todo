'use client';

import { useRouter } from 'next/navigation';

import { Todo } from '@app/features/todos/types';
import { useAppDispatch } from '@app/store';
import { closeModal } from '@app/store/modals/slice';

import { ModalCommonWrapper } from '@components/ui/Modal/CommonWrapper';
import { TodoItemCompact } from '@components/ui/TodoItem';

export const DayTodosModal: React.FC<{ date: Date; todos: Todo[] }> = ({ date, todos }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleOnClick = (todo: Todo) => {
        router.push(`/todos/${todo.id}?from=calendar`);

        dispatch(closeModal());
    };

    return (
        <ModalCommonWrapper
            title={date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
            })}
        >
            <ul className="space-y-2">
                {todos.map(todo => (
                    <TodoItemCompact todo={todo} key={todo.id} onClick={handleOnClick} />
                ))}
            </ul>
        </ModalCommonWrapper>
    );
};
