import { TextInput, ActionIcon, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconTextPlus, IconArrowRight } from '@tabler/icons';

export function InputWithButton(props) {
  const theme = useMantineTheme();
  const form = useForm({
    initialValues: {
      taskTitle: ''
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => {props.addTask(values.taskTitle);form.reset()})}>
    <TextInput
      icon={<IconTextPlus size={18} stroke={1.5} />}
      radius="xl"
      size="md"
      sx={{ marginTop: 10, marginBottom: 20 }}
      rightSection={
        <ActionIcon onClick={() => {props.addTask(form.values.taskTitle);form.reset()}} size={32} radius="xl" color={theme.primaryColor} variant="filled">
            <IconArrowRight size={18} stroke={1.5} />
        </ActionIcon>
      }
      placeholder="Add a task"
      rightSectionWidth={42}
      {...form.getInputProps('taskTitle')}
    />
    </form>
  );
}