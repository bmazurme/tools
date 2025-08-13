import Content from '../../components/content/content';

export default function ProjectsPage() {
  const menu = [
    {
      link: '/project/add',
      name: 'Project add',
    },
    {
      link: '/project/1',
      name: 'Project 1',
    },
    {
      link: '/project/2',
      name: 'Project 2',
    },
    {
      link: '/project/2',
      name: 'Project 2',
    },
  ];

  return (
    <Content menu={menu} sidebar>
      ProjectsPage
      <div>
        Profile data
      </div>
    </Content>
  );
}
