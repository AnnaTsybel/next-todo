import { useDeleteTodo } from '@/app/features/todos/hooks';
import { Todo } from '@/app/features/todos/types';

export function TodoItem({ todo }: { todo: Todo }) {
    const { mutate: mutateDeleteTodo } = useDeleteTodo();

    const deleteTodo = () => {
        mutateDeleteTodo(todo.id);
    };

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-zinc-100">
            <div className="flex shrink-0 gap-4 items-center justify-center rounded-full text-sm font-semibold">
                <button onClick={deleteTodo}>Delete</button>
                <button>Edit</button>
            </div>
            <div className="flex flex-col gap-1">
                <h3 className="text-base font-medium">{todo.title}</h3>
                {todo.description && <p className="text-sm text-zinc-400">{todo.description}</p>}
                <div className="mt-1 flex gap-3 text-xs text-zinc-500">
                    <span>🕒 {new Date(todo.created_at).toLocaleDateString()}</span>

                    {todo.expired_at && (
                        <span>⏰ {new Date(todo.expired_at).toLocaleDateString()}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
