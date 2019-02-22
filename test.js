console.time("changefilter");
var filterSearch = [
    'specificationFilter_5:',
    'specificationFilter_9:',
    'specificationFilter_51:',
    'specificationFilter_52:',
    'specificationFilter_191:',
    'specificationFilter_194:',
    'specificationFilter_198:',
    'specificationFilter_199:',
    'specificationFilter_204:',
    'specificationFilter_212:',
    'specificationFilter_218:',
    'specificationFilter_219:',
    'specificationFilter_221:',
    'specificationFilter_243:',
    'specificationFilter_250:',
    'specificationFilter_253:',
    'specificationFilter_254:',
];

var urlParams = new URLSearchParams(window.location.href);
var params = urlParams.get('filters');
var specification = null;
var valid = false;

for (var i = 0; i < filterSearch.length; i++) {
    if (params && params.includes(filterSearch[i])) {
        if (!specification) {
            specification = filterSearch[i];
            valid = true;
        }

        if (specification != filterSearch[i]) {
            valid = false;
            break;
        }
    }
}

if (valid) {
    params = params.replace('[','').replace(']','').split('fq='+specification);
    var filterValue = '';
    var product = vtxctx.categoryName;

    // sempre com um filtro ele retorna 2 itens no array
    if (params.length > 2) {
        valid = false;
    }

    if (valid) {
        params.forEach(function(param) {
            param = param.replace(',','');

            if (filterValue) {
                filterValue = filterValue+', '+param;
                return;
            }
            filterValue = param;
        });

        var metaDescription = document.querySelector('[name="description"]');
        var description = metaDescription.getAttribute('content');
        description = product+' - '+filterValue+' C&A - '+description;
        metaDescription.setAttribute('content', description);

        var pageTitle = product+' - '+filterValue+' - C&A';
        var metaAbstract = document.querySelector('[name="Abstract"]');

        metaAbstract.setAttribute('content', pageTitle);
        document.title = pageTitle;

        var canonicalEl = document.querySelector('[rel="canonical"]');
        canonicalEl.setAttribute('href', window.location.href);
        var textMenu = document.getElementsByClassName('side-menu_text');
        if (textMenu) {
            textMenu = textMenu[0];
            textMenu.innerHTML = '';
        }
    }
}
console.timeEnd("changefilter");
