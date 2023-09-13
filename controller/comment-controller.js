import comment from "../model/comment.js"

export const newComment = async(req,res)=>{
        try{

            let user = await comment.create({
                name: req.body.name,
                postId: req.body.postId,
                comments: req.body.comments,
              });
              return res.status(200).json({msg:"Comment Saved Successfull..."})  

        }
        catch(error){
            return res.status(500).json({msg:"Failed to Add Comment..."})
        }
}

export const getComment = async(req,res)=>{
        try{
              let comments = await comment.find({postId:req.params.id});
              return res.status(200).json(comments)  

        }
        catch(error){
            return res.status(500).json({msg:"Failed to fetch Comments..."})
        }
}
export const deleteComment = async(req,res)=>{
        try{
              let cmt = await comment.findById(req.params.id);
              if(!cmt)   return res.status(200).json({msg:"No comment avaible"}) 
              await comment.findByIdAndDelete(req.params.id) 
              return res.status(200).json({msg:"Comment deleted Succefully"})   

        }
        catch(error){
            return res.status(500).json({msg:"Failed to fetch Comments..."})
        }
}