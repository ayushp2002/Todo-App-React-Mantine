import { useState } from 'react';
import {
  createStyles,
  Navbar,
  Group,
  ScrollArea,
  Badge,
  Text,
  TextInput,
  ActionIcon,
  useMantineTheme
} from '@mantine/core';
import {
  IconPlaylistAdd,
  IconSearch,
  IconArrowRight
} from '@tabler/icons';
import { UserButton } from './UserButton';
import { useForm } from '@mantine/form';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    navbar: {
      backgroundColor: '#228be6'
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.fn.lighten('#228be6', 0.2)}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.fn.lighten('#228be6', 0.2)}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `10px 7px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.fn.lighten('#228be6', 0.1),
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.xs,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.lighten('#228be6', 0.15),
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    }
  };
});

export function NavbarSimpleColored(props) {
  const theme = useMantineTheme();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("All");
  const form = useForm({
    initialValues: {
      searchString: ''
    }
  });

  const links = props.lists.map((item) => (
    <span
      className={cx(classes.link, { [classes.linkActive]: item.details.label === active })}
      key={item.details.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.details.label);
        props.selectList(item.details.label)
      }}
    >
      <item.details.icon className={classes.linkIcon} stroke={1.5} />
      <Text>{item.details.label}</Text>
      <Badge sx={{ marginLeft: 'auto', minWidth: 'fit-content' }}>{item.count}</Badge>
    </span>
  ));

  var userdata = {
    "image": "https://www.japantimes.co.jp/wp-content/uploads/2013/03/nn20120216a7a.jpg",
    "name": "Ninja Hattori",
    "email": "kenichi.mitsuba@dingding.gao"
  };

  return (
    <Navbar fixed={true} height={'100vh'} width={{ sm: 280 }} p="sm" className={classes.navbar}>
      <Navbar.Section>
        <Group className={classes.header} position="apart">
          <UserButton {...userdata} />
        </Group>
        {/* <form onSubmit={(values) => props.searchList(values.searchString)}> */}
        <form>
          <TextInput
            placeholder="Search"
            size="xs"
            icon={<IconSearch size={14} stroke={1.8} />}
            mb="sm"
            rightSectionWidth={30}
            {...form.getInputProps('searchString')}
            rightSection={
              // <ActionIcon onClick={() => props.searchList(form.values.searchString)} sx={{ cursor: 'pointer' }} size={20} radius="sm" color={theme.primaryColor} variant="filled">
              <ActionIcon sx={{ cursor: 'pointer' }} size={20} radius="sm" color={theme.primaryColor} variant="filled">
                <IconArrowRight size={18} stroke={1.5} />
              </ActionIcon>
            }
          />
        </form>
      </Navbar.Section>

      <Navbar.Section grow component={ScrollArea}>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <span className={classes.link} onClick={() => props.openNewListModal()}>
          <IconPlaylistAdd className={classes.linkIcon} stroke={1.5} />
          <span>New List</span>
        </span>
      </Navbar.Section>
    </Navbar>
  );
}