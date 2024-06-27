const ConectarBD=require("./ConectarBD");

class UsuariosBD extends ConectarBD{
    constructor(){
        super();
    }
    async nuevoUsuario(usuario){
        const sql="INSERT INTO usuarios values(null,'"+usuario.nombre+"','"+usuario.celular+"','"+usuario.correo+"');";
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            console.log("Crear nuevo usuario");
            await this.cerrarConexion();
        } catch (error) {
            console.error("Error al agregar usuario "+error);
            console.error(sql);
        }
    }

    async mostrarUsuarios() {
        const sql="SELECT * FROM usuarios;";
        try {
            await this.conectarMySql();
            const [usuariosMySql] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Los datos se obtuvieron correctamente");
            return (usuariosMySql);
        } catch (error) {
            console.error("Error al obtener los datos "+error);
            console.error(sql);
        }
    }

    async usuarioId(id){
        const sql="SELECT * FROM usuarios WHERE idusuarios="+id+";";
        try {
            await this.conectarMySql();
            const [[usuario]] = await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Conexion correcta por id");
            return usuario;
        } catch (error) {
            console.error("Error al consultar por id"+error);
            console.error(sql);
        }
    }

    async editarUsuario(usuario){
        const sql="UPDATE usuarios SET nombre='"+usuario.nombre+"', celular'"+usuario.celular+"', correo='"+usuario.correo+"';";
        const sql2=`UPDATE usuarios SET 
        nombre='${usuario.nombre}',
        celular='${usuario.celular}',
        correo='${usuario.correo}'
        WHERE idusuario = ${usuario.idusuarios};`; // 2 formas diferentes //
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql2);
            await this.cerrarConexion();
            console.log("Actualizacion Correcta de usuario");
            ///console.error(sql2);
        } catch (error) {
            console.error("Error al editar usuario"+error);
            console.error(sql2);
        }
        //res.end();
    }

    async borrarUsuario(idusuario){
        const sql="DELETE FROM usuarios WHERE idusuario="+idusuarios;
        try {
            await this.conectarMySql();
            await this.conexion.execute(sql);
            await this.cerrarConexion();
            console.log("Usuario borrado correctamente");
        } catch (error) {
            console.error("Error al borrar el usuario"+error);
            console.log(sql);
        }
    }

}


module.exports=UsuariosBD;