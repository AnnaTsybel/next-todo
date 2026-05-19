import { Plus } from 'lucide-react';

import { useAppDispatch } from '@app/store';
import { openModal } from '@app/store/modals/slice';

import { CreateTodo } from '@components/ui/Modal/CreateTodo';

export const CreateTodoButton = () => {
    const dispatch = useAppDispatch();

    return (
        <button
            onClick={() => dispatch(openModal({ content: <CreateTodo /> }))}
            className="
                flex items-center gap-2
                bg-accent hover:bg-accent-hover
                text-white font-semibold
                px-2 py-1 sm:px-4 sm:py-2
                rounded-lg
                shadow-md
                text-sm sm:text-base
                transition
                cursor-pointer
            "
        >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Create Task</span>
        </button>
    );
};
