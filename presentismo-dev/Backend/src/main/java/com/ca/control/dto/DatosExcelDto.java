package com.ca.control.dto;

public class DatosExcelDto {

    private String ClaveProyecto;
    private String CodigoInternoProyecto;
    private String CodigoFase;
    private String CodigoRecurso; // terno
    private String LegajoRecurso; // legajo
    private String FechaDesde; // begin
    private String FechaHasta; // end
    private String Horas; // fdiferencia entre ambas
    private String Descripcion;

    public DatosExcelDto() {
    }

    public String getClaveProyecto() {
        return ClaveProyecto;
    }

    public void setClaveProyecto(String ClaveProyecto) {
        this.ClaveProyecto = ClaveProyecto;
    }

    public String getCodigoInternoProyecto() {
        return CodigoInternoProyecto;
    }

    public void setCodigoInternoProyecto(String CodigoInternoProyecto) {
        this.CodigoInternoProyecto = CodigoInternoProyecto;
    }

    public String getCodigoFase() {
        return CodigoFase;
    }

    public void setCodigoFase(String CodigoFase) {
        this.CodigoFase = CodigoFase;
    }

    public String getCodigoRecurso() {
        return CodigoRecurso;
    }

    public void setCodigoRecurso(String CodigoRecurso) {
        this.CodigoRecurso = CodigoRecurso;
    }

    public String getLegajoRecurso() {
        return LegajoRecurso;
    }

    public void setLegajoRecurso(String LegajoRecurso) {
        this.LegajoRecurso = LegajoRecurso;
    }

    public String getFechaDesde() {
        return FechaDesde;
    }

    public void setFechaDesde(String FechaDesde) {
        this.FechaDesde = FechaDesde;
    }

    public String getFechaHasta() {
        return FechaHasta;
    }

    public void setFechaHasta(String FechaHasta) {
        this.FechaHasta = FechaHasta;
    }

    public String getHoras() {
        return Horas;
    }

    public void setHoras(String Horas) {
        this.Horas = Horas;
    }

    public String getDescripcion() {
        return Descripcion;
    }

    public void setDescripcion(String Descripcion) {
        this.Descripcion = Descripcion;
    }

    public DatosExcelDto(String ClaveProyecto, String CodigoInternoProyecto, String CodigoFase, String CodigoRecurso, String LegajoRecurso, String FechaDesde, String FechaHasta, String Horas, String Descripcion) {
        this.ClaveProyecto = ClaveProyecto;
        this.CodigoInternoProyecto = CodigoInternoProyecto;
        this.CodigoFase = CodigoFase;
        this.CodigoRecurso = CodigoRecurso;
        this.LegajoRecurso = LegajoRecurso;
        this.FechaDesde = FechaDesde;
        this.FechaHasta = FechaHasta;
        this.Horas = Horas;
        this.Descripcion = Descripcion;
    }

}
