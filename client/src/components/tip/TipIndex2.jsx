import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/TipIndex.css';
import { Link } from 'react-router-dom';

const BoardList = () => {
    const [boardList, setBoardList] = useState<BoardTtpe[]>([])

    const boardLength = boardList.length

    useEffect(() => {
        axios.get('http://localhost:3000/boards')
            .then((response) => {
                setBoardList(response.data)
            })

            .catch(function(error) {
                console.log(error);
            })
    }, [])

    return (
        <div className="board-list">
            <Title children="Board list"/>

            <h4>Total post : {boardLength}</h4>
        </div>
    )
}