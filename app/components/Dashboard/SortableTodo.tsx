import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { Todo } from '@features/todos/types';

import { TodoItem } from '@components/Dashboard/TodoItem';

export const SortableTodo: React.FC<{ todo: Todo }> = ({ todo }) => {
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: todo.id,
        attributes: {
            role: 'button',
            tabIndex: 0,
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1,
    };

    const dragListeners = {
        onPointerDown: (e: React.PointerEvent) => {
            if ((e.target as HTMLElement).closest('button')) {
                return;
            }
            listeners?.onPointerDown?.(e);
        },
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...dragListeners}>
            <TodoItem todo={todo} />
        </div>
    );
};
