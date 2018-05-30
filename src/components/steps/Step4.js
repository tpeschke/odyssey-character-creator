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
        this.setState({scores: this.formatProps(), history: [this.formatProps()]})
    }

    formatProps = () =>{
        return [{id: 1, title: 'STR', score: this.props.scores.str}, {id: 2, title: 'INT', score: this.props.scores.int},{id: 3, title: 'WIS', score: this.props.scores.wis},{id: 4, title: 'DEX', score: this.props.scores.dex},{id: 5, title: 'CON', score: this.props.scores.con},{id: 6, title: 'CHA', score: this.props.scores.cha}, {id: 7, title: 'LKS', score: this.props.scores.lks}]
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
            tempHistory.length <= 1 ? this.props.SETBP(90) : tempHistory.length <= 2 ? this.props.SETBP(65) : this.props.SETBP(40);
            this.state.history[this.state.history.length-1] === this.state.scores ? tempHistory.pop() : null;
            let newScores = tempHistory.pop()
            if (tempHistory.length === 0) {
                newScores = this.formatProps()
                tempHistory = [this.formatProps()]
            }
            this.setState({scores: newScores, history: tempHistory})
    }

    saveScores = () => {
        let {scores} = this.state
        this.props.SETSCORES({str: scores[0].score, int: scores[1].score, wis: scores[2].score, dex: scores[3].score, con: scores[4].score, cha: scores[5].score, lks: scores[6].score})
        this.props.history.push('/step5')
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
                        <Droppable droppableId={`${i}`}>
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

                <button onClick={this.undoChange}>Undo Change</button>
                <br/>
                <br/>
                <button onClick={this.saveScores}>Save Scores</button>
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


export default connect(mapStateToProps,{SETBP, SETSCORES})(Step4)