import Post from "../model/post.js"
export const createPost = async (req,res) =>{
    try{
    let user = await Post.create({
        title: req.body.title,
        name: req.body.name,
        description: req.body.description,
        picture: req.body.picture,
        categories: req.body.categories,
        // createdDate: req.body.createdDate,
      });
   
      console.log(user)
      return res.status(200).json({msg:"Post Saved Successfull..."})
    }
    catch(e){
        return res.status(500).json({msg:"Postfailed to Update Successfull..."})
    }
}
export const getAllPosts = async (req,res) =>{
    const category = req.query.category;
    try{
        let posts;
        if(category){
            posts = await Post.find({categories:category});
        }else{

             posts = await Post.find({})
        }
  
      return res.status(200).json(posts)
    }
    catch(e){
        return res.status(500).json({msg:"Post failed to Update Successfull..."})
    }
}
export const getPost = async (req,res) =>{
    const id = req.params.id;
    try{
        let posts =await Post.findById(id);
 
        return res.status(200).json(posts)
    }
    catch(e){
        return res.status(500).json({msg:"Id not found"})
    }
}
export const updatePost = async (req,res) =>{
    const id = req.params.id;
    try{
        let post =await Post.findById(id);
        if(!post) return res.status(404).json({msg:"Post not found"})

        await Post.findByIdAndUpdate(id  , {$set:req.body})  // $set , $addToset
        return res.status(200).json({msg:"Post Updated successfully"})
    }
    catch(e){
        return res.status(500).json({msg:"Id not found"})
    }
}

export const deletePost = async (req,res) =>{
    const id = req.params.id;
    try{
        let post =await Post.findById(id);
        if(!post) return res.status(404).json({msg:"Post not found"})

        await Post.findByIdAndDelete(id);
        return res.status(200).json({msg:"Post Deleted  successfully"})
    }
    catch(e){
        return res.status(500).json({msg:"error  found"})
    }
}