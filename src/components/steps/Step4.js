import React, {Component} from 'react'
import _ from 'lodash'

import { connect } from 'react-redux'
import { SETBP, SETSCORES } from '../../dux/reducer'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

class Step4 extends Component{
    constructor(){
        super()

        this.state = {
            scores: [],
            history: []
        }
    }

    componentDidMount() {
        this.props.SETBP(90)
        this.setState({scores: this.props.scores})
    }

    onDragEnd = result => {
        const {source, destination} = result

        if (!destination) {
            return;
        }

        if (source.droppableId !== destination.droppableId) {
            let tempScores = _.cloneDeep(this.state.scores)
            let tempHistory = _.cloneDeep(this.state.history)
            
            let hold = tempScores[+source.droppableId].score
            
            tempScores[+source.droppableId].score = tempScores[+destination.droppableId].score
            tempScores[+destination.droppableId].score = hold
            
            tempHistory.push(tempScores)

            tempHistory.length === 1 ? this.props.SETBP(90) : tempHistory.length === 2 ? this.props.SETBP(65) : this.props.SETBP(40);

            this.setState({scores: tempScores, history: tempHistory})
        }
    }

    undoChange = () => {
            let tempHistory = _.cloneDeep(this.state.history)
            tempHistory.length <= 0 ? this.props.SETBP(90) : tempHistory.length <= 1 ? this.props.SETBP(65) : this.props.SETBP(40);
            this.state.history[this.state.history.length-1] === this.state.scores ? tempHistory.pop() : null;
            let newScores = tempHistory.pop()
            if (tempHistory.length === 0) {
                newScores = this.props.scores
                tempHistory = []
            }
            this.setState({scores: newScores, history: tempHistory})
    }

    saveScores = () => {
        let {scores} = this.state
        this.props.SETSCORES(scores)
        this.props.history.push('/step5')
    }

    render() {
        return (
            <div className='StepOuter'>

                <div className='stepBody'> 
                <div className="stepTitle">
                    <h1>Step 4: Arrange Ability Scores</h1>
                </div> 

                <div className="stepInner">
                <div className='scoreDisplay'>  
            <DragDropContext
                onDragEnd={this.onDragEnd}>

            {this.state.scores.map((a,i) => {
                return (
                    <div key={a.id}>
                        <h2>{a.title}</h2>
                        <div className="scoreUnderscore"/>
                        <Droppable droppableId={`${i}`}>
                {(provided, snapshot) => (
                    <div>
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
                                    <p className="scoreScore">{a.score}</p>   
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

                <button onClick={this.undoChange}>Undo Change</button>
                <br/>
                <br/>
                <button onClick={this.saveScores}>Save Scores</button>
            </div>
            </div>
            </div>
        )
    }
}

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#a62020' : 'grey',
    width: 50
});

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',

    // change background colour if dragging
    background: isDragging ? '#2d2d2a' : 'grey',
    color: isDragging ? '#a62020' : '#2d2d2a',

    // styles we need to apply on draggables
    ...draggableStyle
});

function mapStateToProps(state) {
    let {scores} = state

    return {
        scores
    }
}


export default connect(mapStateToProps,{SETBP, SETSCORES})(Step4)