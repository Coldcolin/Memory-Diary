import React, {useState, useEffect, useContext} from 'react'
import styled from 'styled-components'
import app from '../../Base'
import {AuthContext} from '../AuthProvider'
import firebase from 'firebase'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
const FavoriteMemory = () => {

    const {currentUser} = useContext(AuthContext)

    const [memory, setMemory] = useState("")
    const [view, setView] = useState([])

    const [toggle, setToggle] = useState(false)
    const  onToggle = ()=> {
        setToggle(!toggle)
    }

    const [fav, setFav] = useState(false)
    const [unFav, setUnFav] = useState(true)

    const updateFavourite = async (id)=> {
        await app.firestore().collection("memories")
        .doc(currentUser.uid)
        .collection("myMemory").doc(id).set({            
            favorite: toggle,
        })
        setMemory("")
    }

    const viewMemories = async ()=> {
        await app.firestore().collection("memories")
        .doc(currentUser.uid)
        .collection("myMemory")
        .onSnapshot((snapshot)=> {
            const item = []
            snapshot.forEach((doc)=> {
                item.push({ ...doc.data(), id: doc.id})
            })
            setView(item)
        })
        
    }

    useEffect(()=> {
        viewMemories()
    },[])
    return (
        <>
            <Container>
                <Wrapper>
                <View>
                        {view?.map((props)=> (
                            <div>
                                {props.createdBy === currentUser?.uid ? (
                                    <>
                                        {props.favorite === true ? (
                                                <ViewMemo>
                                                <Memory>
                                                    {props.memory}
                                                </Memory>                                            
                                                <FavIcon>
                                                {props.favorite ? 
                                                <FavoriteIcon 
                                                    onClick={()=> {
                                                        onToggle()
                                                        updateFavourite()
                                                    }}/>: 
                                                <FavoriteBorderIcon
                                                onClick={()=> {
                                                    onToggle()
                                                    updateFavourite()
                                                }}
                                                />}
                                                </FavIcon>
                                            </ViewMemo> 
                                        ) : null}
                                                                              
                                    </>
                                ) : null}
                            </div>
                        ))}
                    </View>
                </Wrapper>
            </Container>
        </>
    )
}

export default FavoriteMemory


const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: lightcyan;
`
const Wrapper = styled.div`
     width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    
`
const Holder = styled.div`
    width: 400px;
    height: 150px;
    margin-top: 80px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
`
const View = styled.div`
    margin-top: 40px;
    border: 1px solid;
`
const Input = styled.input`
    margin-top: 20px;
    padding: 10px 10px;
    width: 250px;
    border-radius: 4px;
    border: 1px lightgrey solid;
`
const Button = styled.button`
    background: ${({ bg })=> bg};
    padding: 5px 10px;
    color: white;
    margin-top: 10px;
    border: 0;
    border-radius: 4px;
`

const Record = styled.div`
    margin-top: 10px;
    font-weight: bold;
    display: flex;
    align-items: center;
    span{
        color: red;
        font-size: 20px;
        margin-left: 5px;
    }
`

const ViewMemo = styled.div`
    width: 250px;
    padding: 0 10px;
    min-height: 60px;
    height: 100%;
    background-color: #fff;
    margin: 10px;
    border-radius: 5px;
    box-shadow: 0px 0px 7px 1px rgba(0, 0, 0, 0.2);
    align-items: center;
    display: flex;
    justify-content: center;
    font-size: 12px;
    flex-direction: column;
`
const FavIcon = styled.div`
    color: red;
`
const Memory = styled.div`

`
const ButtonHolder = styled.div`

`