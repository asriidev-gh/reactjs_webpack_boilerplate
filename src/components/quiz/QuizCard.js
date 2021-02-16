import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";


const useStyles = makeStyles({
    root: {
      minWidth: 250,            
      maxWidth: 250,
      minHeight: 340,
      maxHeight: 340,
    },
    media: {
      height: 140,
    },
    customBox: {
        display: "-webkit-box",
        boxOrient: "vertical",
        lineClamp: 2,
        wordBreak: "break-all",
        overflow: "hidden"
    },
    alignCenter: {
        justifyContent: 'center',
    }
});

const QuizCard = ({quizId,quizName,category,description,imageUrl}) => {
    const classes = useStyles();
    
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={`./../assets/images/quiz/${imageUrl}`}
                    title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {quizName}
                </Typography>
                <Typography variant="body2" color="primary" component="p">
                    {category}
                </Typography><br/>
                <Box
                     fontSize="h5.fontSize"
                     component="div"
                     classes={{root: classes.customBox}}
                >
                    
                    <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                    </Typography>
                </Box>
                    {/* {category+":"+description} */}
                
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.alignCenter}>                
                <Link to={`/quizdetails/${quizId}`} className="btn-primary room-link">
                    <Button color="primary" variant="outlined">Show Details</Button>
                </Link>
            </CardActions>
        </Card>
    )
}

export default QuizCard;
