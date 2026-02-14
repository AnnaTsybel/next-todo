import { Plus } from 'lucide-react';

import { useAppDispatch } from '@app/store';
import { openModal } from '@app/store/modals/slice';

import { CreateTodo } from './Modal/CreateTodo';

export const CreateTodoButton = () => {
    const dispatch = useAppDispatch();

    return (
        <button
            onClick={() => dispatch(openModal({ content: <CreateTodo /> }))}
            className="
                flex items-center gap-2
                bg-accent hover:bg-accent-hover
                text-white font-semibold
                px-4 py-2 rounded-lg
                shadow-md
                transition
                cursor-pointer
            "
        >
            <Plus className="w-5 h-5" />
            Create Todo
        </button>
    );
};
