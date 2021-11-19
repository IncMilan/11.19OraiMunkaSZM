$(function(){
    const konyvek = [];
    // ELÉRÉS:
    let eleresiut =" http://localhost:3000/konyvek";
    // LEKÉRÉSEK:
    let mezoszerint = eleresiut + "?nev_like=Rejtő";
    let rendezes = eleresiut + "?_sort=nev&_order=desc";
    let kettokozott = eleresiut + "?ar_gte=1000&ar_lte=2000"

    let adat={
        "nev": "József Attila",
        "cim": "összes versei",
        "ar": 3270,
        "kategoria":"vers"
    }
    let modositottadat={
        "nev": ""
    }

    
    // AJAX
     MyAjax(eleresiut,konyvek,kiir)
     function MyAjax(eleresiut,tomb,myCallback){
        tomb.splice(0,tomb.length);
        console.log(eleresiut);
        $.ajax({
            url: eleresiut,
            type: "GET",
            success: function(result){
                console.log(result);
                result.forEach((element) => {
                    tomb.push(element);
                });
                myCallback(tomb);
            },
        });
    }
    $(".ujadat").on("click",()=>{MyAjaxPost(eleresiut,adat);})

     function MyAjaxPost(eleresiut,adat){
        console.log(eleresiut);
        $.ajax({
            url: eleresiut,
            type: "POST",
            data:adat,
            success: function(result){
                console.log(result);
                MyAjax(eleresiut,konyvek,kiir)
            },
        });
    }
    MyAjax(eleresiut,konyvek,kiir)
    $(".torles").on("click",()=>{MyAjaxDelete(eleresiut, 4);})
    function MyAjaxDelete(eleresiut,id){
        console.log(eleresiut);
        $.ajax({
            url: eleresiut+"/"+id,
            type: "DELETE",
        
            success: function(result){
                console.log(result);
                MyAjax(eleresiut,konyvek,kiir)
            },
        });
    }
    $(".modosit").on("click",()=>{MyAjaxPut(eleresiut, );})
    function MyAjaxPut(eleresiut,adat){
        
        $.ajax({
            url: eleresiut+ "/"+ adat.id,
            type: "PUT",
            data:adat,
            success: function(result){
                console.log(result);
                MyAjax(eleresiut,konyvek,kiir)
            },
        });

    function kiir(tomb, szoveg){
        console.log(tomb);
        let sablon = "";
        tomb.forEach((elem) => {
            sablon += `
            <div>
            <h3>${elem.nev}</h3>

            <h4 class="cim">
            ${elem.cim}
            </h4>
            <p>${elem.kategoria}</p>

            <span class="ar">${elem.ar}</span>
            </div>
            `;
        });
        $(".adatok").html(sablon);
    }

});