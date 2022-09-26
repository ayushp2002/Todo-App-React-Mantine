import { useForm } from '@mantine/form';
import { createStyles, Modal, Group, TextInput, Button } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  input: {
    height: 'auto',
    paddingTop: 18,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

export function NewListModal(props) {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      listName: ''
    },
    validate:{
      listName: (value) => (props.data.find(element => element.label === value) ? `List name ${value} already in use` : null)
    }
  });

  return (
    <Modal
      centered
      size="lg"
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={props.modalState}
      onClose={() => props.openModal(false)}
      title="New list">
      <form onSubmit={form.onSubmit((values) => {props.createNewList(values);props.openModal(false);form.reset()})}>
        <TextInput data-autofocus required label="List name" placeholder="Groceries" classNames={classes} {...form.getInputProps('listName')} />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
}