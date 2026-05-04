import Content from '../../components/content/content';
import NotFoundLayout from '../../layouts/not-found-layout';

export default function NotFoundPage() {
  return (
    <Content>
      <NotFoundLayout
        title="404 — Страница не найдена"
        description="К сожалению, запрошенная страница не существует."
        buttonLabel="Вернуться на главную"
      />
    </Content>
  );
}
