import { Trash } from 'lucide-react';

import { useDeleteTodoType } from '@features/todo-types/hooks';
import { TodoType } from '@features/todo-types/types';

export const TodoTypeItem: React.FC<{ type: TodoType }> = ({ type }) => {
    const { mutate: deleteType, isPending: isDeleting } = useDeleteTodoType();

    return (
        <div
            key={type.id}
            className="flex items-center justify-between rounded-md border border-zinc-800 px-3 py-2"
        >
            <div className="flex items-center gap-3">
                <span
                    className="h-3 w-3 rounded-full"
                    style={{
                        backgroundColor: type.color,
                    }}
                />

                <span className="text-sm text-foreground">{type.name}</span>

                {type.is_system && (
                    <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        system
                    </span>
                )}
            </div>

            {!type.is_system && (
                <button
                    onClick={() => deleteType(type.id)}
                    disabled={isDeleting}
                    type="button"
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
            )}
        </div>
    );
};
