    let svgDoc = null;

    function init_svg_document_ref()
    {
        if ( svgDoc === null ) {
            const svgElement = document.getElementById( "svgHostElement" );
            svgDoc = svgElement.contentDocument;
        }
    }

    function update_svg_numeric_value( event, svgEleId, fractionDigits, optUnits = false, optExp = false )
    {
        init_svg_document_ref();
        const targetElement = svgDoc.getElementById( svgEleId );
        if ( targetElement == null ) {
            return;
        }
        const value = optExp ? event.channelValueLatest.val.toExponential( fractionDigits ):  event.channelValueLatest.val.toFixed( fractionDigits );
        const units = optUnits ? event.channelMetadata.egu : "";
        targetElement.textContent = value + " " + units;
    }

    function update_svg_string_value(event, svgEleId, optUnits = false )
    {
        init_svg_document_ref();
        const targetElement = svgDoc.getElementById( svgEleId );
        if ( targetElement == null ) {
            return;
        }
        const units = optUnits ? event.channelMetadata.egu : "";
        targetElement.textContent = event.channelValueLatest.val + " " + units ;
    }

    function update_svg_component_color(event, svgElementId, okValue, nokValue )
    {
        const errColor = "orange";
        const nokColor = "red";
        const okColor = "limegreen";

        init_svg_document_ref();
        const svgElement = svgDoc.getElementById( svgElementId );
        if ( svgElement == null ) {
            return;
        }

        switch ( event.channelValueLatest.val )
        {
            case okValue:
                svgElement.style.setProperty( "--component_fill_color", okColor );
                break;

            case nokValue:
                svgElement.style.setProperty( "--component_fill_color", nokColor );
                break;

            default:
                svgElement.style.setProperty( "--component_fill_color", errColor );
                break;
        }
    }

    function update_svg_gauge_level( event, svgElementId, optSelectSensitiveScale = true )
    {
        init_svg_document_ref();

        const svgElement = svgDoc.getElementById( svgElementId );
        if ( svgElement == null ) {
            return;
        }

        const value =  event.channelValueLatest.val;
        // Range Scale 1 Calculation is derived as follows:
        // - Pressure = 10-3:  gauge_level_in_percent = 95%
        // - Pressure = 10-7:  gauge_level_in_percent = 5%

        // Range Scale 2 Calculation is derived as follows:
        // - Pressure = 10-1:  gauge_level_in_percent = 95%
        // - Pressure = 10-5:  gauge_level_in_percent = 5%

         const gauge_level_in_percent = optSelectSensitiveScale ?
             clamp(95 + 22.5 * (3 + Math.log10(value)), 0, 100) :
             clamp(95 + 22.5 * (1 + Math.log10(value)), 0, 100);
        svgElement.style.setProperty( "--gauge_level_in_percent", gauge_level_in_percent );
    }

    function clamp( num, min, max ) {
        return num <= min ? min : num >= max ? max : num;
    }

