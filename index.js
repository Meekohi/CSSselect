"use strict";

module.exports = CSSselect;

var Pseudos     = require("./lib/pseudos.js"),
    DomUtils    = require("domutils"),
    findOne     = DomUtils.findOne,
    findAll     = DomUtils.findAll,
    getChildren = DomUtils.getChildren,
    falseFunc   = require("./lib/basefunctions.js").falseFunc,
    compile     = require("./lib/compile.js");

function getSelectorFunc(searchFunc){
	return function select(query, elems, options){
		if(typeof query !== "function") query = compile(query, options);
		if(!Array.isArray(elems)) elems = getChildren(elems);
		return searchFunc(query, elems);
	};
}

var selectAll = getSelectorFunc(function selectAll(query, elems){
	return (query === falseFunc || !elems || elems.length === 0) ? [] : findAll(query, elems);
});

var selectOne = getSelectorFunc(function selectOne(query, elems){
	return (query === falseFunc || !elems || elems.length === 0) ? null : findOne(query, elems);
});

function is(elem, query, options){
	return (typeof query === "function" ? query : compile(query, options))(elem);
}

/*
	the exported interface
*/
function CSSselect(query, elems, options){
	return selectAll(query, elems, options);
}

CSSselect.compile = compile;
CSSselect.filters = Pseudos.filters;
CSSselect.pseudos = Pseudos.pseudos;

CSSselect.selectAll = selectAll;
CSSselect.selectOne = selectOne;

CSSselect.is = is;

//legacy methods (might be removed)
CSSselect.parse = compile;
CSSselect.iterate = selectAll;
