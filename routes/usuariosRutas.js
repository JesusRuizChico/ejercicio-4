const ruta=require("express").Router();
const UsuarioClase=require("../clases/UsuarioClase");
const UsuarioBD=require("../bd/UsuariosBD");

ruta.get("/", async (req, res) => {
    try {
        const usuariobd = new UsuarioBD();
        const usuariosMySql = await usuariobd.mostrarUsuarios();

        if (usuariosMySql && usuariosMySql.length > 0) {
            const usuariosCorrectos = usuariosMySql.map(usuario => {
                const usuario1 = new UsuarioClase(usuario);
                if (usuario1.nombre && usuario1.celular && usuario1.correo) {
                    return usuario;
                }
            }).filter(usuario => usuario !== undefined);

            res.render("mostrarUsuarios", { usuariosCorrectos });
        } else {
            res.status(404).send('No se encontraron usuarios');
        }
    } catch (error) {
        console.error('Error al obtener los datos de los usuarios:', error);
        res.status(500).send('Error al obtener los datos de los usuarios');
    }
});



ruta.post("/agregarUsuario",(req,res)=>{
    var usuario1=new UsuarioClase(req.body);
    
    if(usuario1.nombre!=undefined && usuario1.celular!=undefined && usuario1.correo!=undefined){
        const usuariobd = new UsuarioBD();
       usuariobd.nuevoUsuario(usuario1.mostrarDatos);
        //console.log(usuario1.mostrarDatos);
        res.render("inicio",usuario1.mostrarDatos);
    }else{
        res.render("error");


    }
    
});

ruta.get("/agregarUsuario",(req,res)=>{
    res.render("formulario");
});

ruta.get("/editarUsuario/:idusuarios",async(req,res)=>{
    try{
        const usuariobd=new UsuarioBD();
        const usuario=await usuariobd.usuarioId(req.params.idusuarios);
        //console.log(usuario);
        res.render("editarUsuario",usuario);
    }catch(error){

    }
  
    // res.end();
    

});

ruta.post("/editarUsuario",async(req,res)=>{
    try{
        const usuariobd=new UsuarioBD();
        // console.log(req.body);
        await usuariobd.editarUsuario(req.body);
        console.log("Usuario editado correctamente")
        res.redirect("/");
    }catch{
        console.error("Error al editar Usuario");
    }
});

ruta.get("/borrarUsuario/:id",async(req,res)=>{
    try{
        const usuariobd=new UsuarioBD();
        await usuariobd.borrarUsuario(req.params.id);
        res.redirect("/");
    }catch (error){
        console.log(error);
    }

});

module.exports=ruta;