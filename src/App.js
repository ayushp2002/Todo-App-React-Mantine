/* Importing the necessary components from the Mantine and Tabler libraries. */
import { Badge, createStyles, Text } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useState, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { IconInfinity, IconListCheck, IconCheck, IconX } from '@tabler/icons';

/* Importing the components from the Components folder. */
import { InputWithButton } from './Components/InputWithButton';
import { NavbarSimpleColored } from './Components/NavbarSimpleColored.js';
import { StatsSegments } from './Components/StatsSegments';
import { TableSelection } from './Components/TableSelection';
import { NewListModal } from './Components/NewListModal';
import { TaskDrawer } from './Components/TaskDrawer';

import './App.css';

import { data as jsondata } from './Data/data.js';

/* Creating a styles object that will be used in the app. */
const useStyles = createStyles((theme) => ({
  rightPane: {
    marginLeft: 320,
    marginRight: 40,
    overflowX: 'hidden',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },

  lead: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 22,
    lineHeight: 1,
  },

  ActionIcon: {
    '&:hover': {
      backgroundColor: theme.fn.lighten('#228be6', 0.4),
    }
  }
}));

/**
 * It returns the JSX code for the app
 * @returns The JSX code for the app.
 */
function App() {
  /* Creating the states. */
  const [selectedList, setSelectedList] = useState("All");
  const [newListModalState, setNewListModalState] = useState(false);
  const [taskDrawer, setTaskDrawer] = useState({opened: false, id: ""});
  
  // const [searchString, setSearchString] = useState("");
  const [data, setData] = useState(jsondata);

  const { classes } = useStyles();

  /* Creating an array of objects that will be used to create the stats segments. */
  var statsData = [
    {
      label: "Completed",
      count: getTasks(selectedList).filter(e => e.task.completed).length,
      part: (((getTasks(selectedList).filter(e => e.task.completed).length) / (getTasks(selectedList).length)) * 100).toFixed(2),
      color: "#228be6"
    }, {
      label: "Pending",
      count: (getTasks(selectedList).length) - (getTasks(selectedList).filter(e => e.task.completed).length),
      part: ((((getTasks(selectedList).length) - (getTasks(selectedList).filter(e => e.task.completed).length)) / (getTasks(selectedList).length)) * 100).toFixed(2),
      color: "#03141a"
    },
  ];

  /* A workaround for a bug in Mantine. */
  const forceUpdate = useReducer(() => ({}), {})[1];

  /**
   * It takes a list name as an argument and returns an array of tasks
   * @param listName - The name of the list you want to get the tasks from.
   * @returns An array of tasks.
   */
  function getTasks(listName) {
    // if (searchString !== "" && searchString !== undefined) {
    //   setSelectedList("Search results");
    // }
    if (listName === 'All') {
      var tasks = [];
      data.map((item) => {
        return item.tasks.map((task) => {
          return tasks.push({task: task, list: item.label});
        })
      });
      return tasks;
    // } else if (selectedList === "Search results") {
    //   var searchData = [];
    //   data.forEach((obj) => {
    //     obj.tasks.forEach((task) => {
    //       if (task.desc.includes(searchString) || task.title.includes(searchString)) {
    //         searchData.push(task.title);
    //       }
    //     });
    //   });
    //   return searchData;
    } else {
      return data.find(element => element.label === listName).tasks.map((task) => ({task: task, list: listName}));
    }
  }

  function getTaskById(id) {
    if (id !== undefined && id.length > 0) {
      return data.reduce((found, item) => found ?? item.tasks.find(task => task.id === id), undefined)
    }
    return " ";
  }

  /**
   * It returns an array of objects, each object containing the details of a list and the number of
   * tasks in that list
   * @returns An array of objects.
   */
  function getLists() {
    const lists = [];
    lists.push({
      details: {
        "label": "All",
        "icon": IconInfinity
      },
      count: getTasks("All").length
    });
    data.map((list) => {
      return lists.push({
        details: {
          "label": list.label,
          "icon": list.icon
        },
        count: getTasks(list.label).length
      });
    });
    return lists;
  }

  /**
   * If the selected list is "All", then return a list of badges for each list, otherwise return a
   * single badge for the selected list
   * @returns a Text component with all tasks as badges in the selected list.
   */
  function getSelectedListBadges() {
    var badges, textList;
    if (selectedList === "All") {
      badges = getLists().map((list) => {
        if (list.details.label !== "All") {
          return <Badge key={list.details.label}>{list.details.label}</Badge>;
        }
        return <></>
      });
      textList = "lists";
    } else {
      badges = <Badge key={selectedList}>{selectedList}</Badge>;
      textList = "list";
    }
    return <Text color="dimmed" size="sm">Total tasks in {textList} {badges} </Text>;
  }

  /**
   * It takes the values from the form, creates a new object with the values, and pushes that object
   * into the data array
   * @param values - The values of the form.
   */
  function createNewList(values) {
    var newData = data;
    newData.push({
      "label": values.listName,
      "icon": IconListCheck,
      tasks: []
    });
    setData(newData);
  }

  /**
   * It adds a new task to the list of tasks
   * @param taskTitle - The title of the task to be added.
   */
  function addNewTask(title) {
    const taskTitle = title.trim();
    var task;
    if (taskTitle.length !== 0) {
      task = {
        id: uuidv4(),
        title: taskTitle,
        completed: false
      }
      var list = selectedList === 'All' ? 'Tasks' : selectedList;
      setData(() => {
        var newTasks = data;
        newTasks.find(element => element.label === list).tasks.unshift(task);
        return newTasks;
      });
      showNotification({
        key: task.id,
        id: 'add-task',
        color: 'teal',
        title: 'Task Added',
        message: `Task "${taskTitle}" added to list ${list}.`,
        icon: <IconCheck size={16} />,
        autoClose: 2000,
      })
    } else {
      showNotification({
        key: uuidv4(),
        id: 'add-task',
        color: 'red',
        title: 'Empty Task',
        message: `Task cannot be empty`,
        icon: <IconX size={18} />,
        autoClose: 2000,
      })
    }
    forceUpdate();
  }

  /* Returning the JSX code for the app. */
  return (
    <div className="App">
      <TaskDrawer opened={taskDrawer.opened} setOpened={setTaskDrawer} task={getTaskById(taskDrawer.id)} />
      <NewListModal
        modalState={newListModalState}
        openModal={setNewListModalState}
        createNewList={(values) => createNewList(values)}
        data={data}
      />
      <NavbarSimpleColored
        lists={getLists()}
        {...selectedList}
        taskCount={getTasks(selectedList).length}
        selectList={(listName) => { setSelectedList(listName) }}
        openNewListModal={() => { setNewListModalState(true) }}
        // searchList={(string) => { setSearchString(string) }}
      />
      <div className={classes.rightPane}>
        <StatsSegments
          listBadges={getSelectedListBadges()}
          listName={selectedList}
          total={getTasks(selectedList).length}
          data={statsData}
          />
        <TableSelection grow list={selectedList} data={getTasks(selectedList)} openItemDialog={(id) => setTaskDrawer({opened: true, id: id})} />
        <InputWithButton type='text' addTask={(taskTitle) => addNewTask(taskTitle)} />
      </div>
    </div>
  );
}

export default App;