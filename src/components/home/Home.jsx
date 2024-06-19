import React, { useEffect, useState } from 'react'
import "./home.scss"
import { RiCloseCircleLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";


const Home = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [monthName, setMonthName] = useState('');
    const [addTask, setAddTask] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setdescription] = useState('');
    const [infoArray, setInfoArray] = useState(sessionStorage.getItem("infoArray") ?
        JSON.parse(sessionStorage.getItem("infoArray")) : []);
    const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [filteredArray, setFilteredArray] = useState(sessionStorage.getItem("infoArray") ?
        JSON.parse(sessionStorage.getItem("infoArray")) : [])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        const currentMonthName = currentDate.toLocaleString('default', { month: 'long' });
        setMonthName(currentMonthName);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (addTask) {
            document.getElementById("title").focus();
        }
    }, [addTask])


    const suffix = () => {
        const date = currentDate.getDate();
        if (date === 11 || date === 12 || date === 13) {
            return `${date}th`
        }
        switch (date % 10) {
            case 1:
                return `${date}st`
            case 2:
                return `${date}nd`
            case 3:
                return `${date}rd`
            default:
                return `${date}th`
        }
    }

    const combinedDate = () => {
        return `${suffix()} ${monthName}, ${currentDate.getFullYear()}`
    }

    const handleClickSave = () => {
        setAddTask(false);

        let infoObject = {
            "title": title,
            "description": description,
            "date": combinedDate(),
            "time": currentDate.toLocaleTimeString()
        }

        let tempArray = []

        if (currentTaskIndex !== null && currentTaskIndex >= 0) {
            tempArray = infoArray.map((currElement, index) => {
                if (index === currentTaskIndex) {
                    return infoObject
                } else {
                    return currElement
                }
            })

            setInfoArray(tempArray)
            setFilteredArray(tempArray);

            sessionStorage.setItem("infoArray", JSON.stringify(tempArray))
        }
        else {
            infoArray.push(infoObject);
            // updation of infoArray and filtered array
            setInfoArray(infoArray);
            setFilteredArray(infoArray);

            sessionStorage.setItem("infoArray", JSON.stringify(infoArray))
        }

        setCurrentTaskIndex(null)
        setTitle("");
        setdescription("")
        // console.log(infoObject);
    }

    // console.log(infoArray)

    const handleCancel = () => {
        setAddTask(false);

        setTitle("");
        setdescription("");

        setCurrentTaskIndex(null);

    }

    const handleDelete = (index) => {
        const valueToBeDeleted = filteredArray.filter((element, i) => i === index);
        const newInfoArray = infoArray.filter(element => element !== valueToBeDeleted[0])

        setInfoArray(newInfoArray);
        setFilteredArray(newInfoArray);

        sessionStorage.setItem("infoArray", JSON.stringify(newInfoArray))

    }
    const handleEdit = (index) => {

        setAddTask(true);
        const taskToEdit = filteredArray[index];

        // store current index
        setCurrentTaskIndex(index);

        setTitle(taskToEdit?.title);
        setdescription(taskToEdit?.description);

    }

    const handleSearch = (value) => {
        setSearchValue(value);
        const tempArray = infoArray.filter((element) => element.title.toLowerCase().includes(value.toLowerCase()));
        setFilteredArray(tempArray);
    }

    useEffect(() => {
        handleSearch(searchValue)
    }, [infoArray])


    return (
        <div className='home'>

            <div className='info'>
                <div>
                    {/* combined function returning time,date and year */}
                    <h4>{combinedDate()}</h4>
                    <h4>{currentDate.toLocaleTimeString()}</h4>
                </div>
                <div className='search' >
                    <input type='text'
                        value={searchValue} placeholder='Search by title...'
                        onChange={(e) => handleSearch(e.target.value)} />
                </div>
            </div>

            {filteredArray.length !== 0 &&
                <div className='card'>
                    {filteredArray?.map((currentElement, cardIndex) => {
                        return (
                            <div className='tiles'>
                                <div className='button'>
                                    <div className='edit' onClick={() => handleEdit(cardIndex)}>
                                        <FiEdit />
                                    </div>
                                    <div className='delete' onClick={() => handleDelete(cardIndex)}>
                                        <RiCloseCircleLine />
                                    </div>
                                </div>

                                <div className='info'
                                    onClick={() => handleEdit(cardIndex)}
                                >
                                    <h4>{currentElement.title}</h4>
                                    <p>{currentElement.description}</p>
                                </div>
                                <div className='timestamp'>
                                    <p>{currentElement.date}</p>
                                    <p>{currentElement.time}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }

            {/* add task button */}
            <button className='addtask' onClick={() => setAddTask(true)} > + Add Task</button>

            {/* overlay */}
            {
                addTask && <div className='parent'>
                    <div className='opaque'></div>
                    <form className='main' onSubmit={handleClickSave}>
                        <input id='title' required type='text'
                            value={title}
                            placeholder='Title*'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            value={description}
                            rows={8} cols={40}
                            placeholder='Desription'
                            onChange={(e) => setdescription(e.target.value)}
                        />
                        <div className='button'>
                            <button className='cancel' onClick={handleCancel}>Cancel</button>
                            <button className='save' type='submit'>Save</button>
                        </div>
                    </form>
                </div >
            }
        </div>
    )
}

export default Home;

