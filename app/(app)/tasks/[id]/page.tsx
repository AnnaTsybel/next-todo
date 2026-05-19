import { RedirectedFrom } from '@features/todos/types';

import { TodoContent } from '@components/Todo/Content';

type Props = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ from?: string }>;
};

const TodoPage = async ({ params, searchParams }: Props) => {
    const { id } = await params;
    const { from } = await searchParams;

    const validFrom = ['dashboard', 'calendar'] as const;
    const typedFrom = validFrom.includes(from as RedirectedFrom)
        ? (from as RedirectedFrom)
        : undefined;

    return <TodoContent id={id} from={typedFrom} />;
};
export default TodoPage;
