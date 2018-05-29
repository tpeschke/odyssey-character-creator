import React, {Component} from 'react'

import { connect } from 'react-redux'
import { SETSCORES } from '../../dux/reducer'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

class Step4 extends Component{
    constructor(props){
        super(props)

        this.state = {
            scores: [{id: 1, title: 'STR', score: props.scores.str}, {id: 2, title: 'INT', score: props.scores.int},{id: 3, title: 'WIS', score: props.scores.wis},{id: 4, title: 'DEX', score: props.scores.dex},{id: 5, title: 'CON', score: props.scores.con},{id: 6, title: 'CHA', score: props.scores.cha}, {id: 7, title: 'LKS', score: props.scores.lks}]
        }
    }

    onDragEnd = result => {
        const {source, destination} = result

        if (!destination) {
            return;
        }

        if (source.droppableId !== destination.droppableId) {
            let tempScores = this.state.scores.slice()
            let hold1, hold2;

            tempScores.forEach(v=> {
                if (v.title === source.droppableId) hold1 = v
                if (v.title === destination.droppableId) hold2 = v
            })

            hold1.title = destination.droppableId
            hold2.title = source.droppableId

            let temp = tempScores[source.index]
            tempScores[source.index] = tempScores[destination.index]
            tempScores[destination.index] = temp

            console.log(source.index)
            this.setState({scores: tempScores})
        }
    }

    render() {
        return (
            <div>
                <h1>Step 4</h1>    
            <DragDropContext
                onDragEnd={this.onDragEnd}>

            {this.state.scores.map((a,i) => {
                return (
                    <div key={a.id}>
                        <h2>{a.title}</h2>
                        <Droppable droppableId={a.title}>
                {(provided, snapshot) => (
                    <div className="item">
                    <div ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}>
                    <Draggable
                        index={i}
                        draggableId={a.id}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableprops}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                        snapshot.isDragging,
                                        provided.draggableProps.style
                                    )}>
                                    <p>{a.score}</p>   
                                </div>
                            )}
                    </Draggable>
                    </div>
                    </div>
                )}
                    </Droppable>
                    </div>
                )
            })}
                </DragDropContext>
            </div>
        )
    }
}

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    width: 250
});

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

function mapStateToProps(state) {
    let {scores} = state

    return {
        scores
    }
}


export default connect(mapStateToProps,{SETSCORES})(Step4)