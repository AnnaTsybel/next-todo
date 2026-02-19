import { TodoContent } from '@components/Todo/Content';

type Props = {
    params: Promise<{ id: string }>;
};

const TodoPage = async ({ params }: Props) => {
    const { id } = await params;

    return <TodoContent id={id} />;
};
export default TodoPage;
