/**
 * Provides wica logging support.
 *
 * @module
 */


/*- Script Execution Starts Here ---------------------------------------------*/

/**
 * JS Object that defines the available log levels including the default that
 * will be used in the absence of an explict call to the setLevel function.
 *
 * @property {number} [NONE = 0]
 * @property {number} [ERROR = 1]
 * @property {number} [WARN = 2]
 * @property {number} [INFO = 3]
 * @property {number} [LOG = 4]
 * @property {number} [DEBUG = 5]
 * @property {number} [TRACE = 6]
 * @property {number} [DEFAULT = 2]
 */
const logLevels = {
    "NONE":    0,
    "ERROR":   1,
    "WARN":    2,
    "INFO":    3,
    "LOG":     4,
    "DEBUG":   5,
    "TRACE":   6,
    "DEFAULT": 2
};

/**
 * Outputs a log message at TRACE level.
 *
 * @param {string} msg - A message string containing zero or more substitution strings.
 * @param {Object} msgOptions - Zero or more objects with which to replace substitution
 *     strings within msg.
 */
function trace( msg, ...msgOptions  ) { logger_.trace( msg, ...msgOptions ); }

/**
 * Outputs a log message at LOG level.
 *
 * @param {string} msg - A message string containing zero or more substitution strings.
 * @param {Object} msgOptions - Zero or more objects with which to replace substitution
 *     strings within msg.
 */
function log( msg, ...msgOptions  ) { logger_.log( msg, ...msgOptions ); }

/**
 * Outputs a log message at INFO level.
 *
 * @param {string} msg - A message string containing zero or more substitution strings.
 * @param {Object} msgOptions - Zero or more objects with which to replace substitution
 *     strings within msg.
 */
function info( msg, ...msgOptions  ) { logger_.info( msg, ...msgOptions ); }

/**
 * Outputs a log message at WARN level.
 *
 * @param {string} msg - A message string containing zero or more substitution strings.
 * @param {Object} msgOptions - Zero or more objects with which to replace substitution
 *     strings within msg.
 */
function warn( msg, ...msgOptions  ) { logger_.warn( msg, ...msgOptions ); }

/**
 * Sets the logging level. Zero means log nothing.
 *
 * @param {number} level - The logging level.
 */
function setLevel( level )
{
    Object.keys( consoleLogMap_ ).forEach(( key ) => {
        logger_[ key ] = level >= consoleLogMap_[ key ].level ? consoleLogMap_[ key ].func : nop_;
} );
}

const nop_ = function() {};

const logger_ = {
    "error" : nop_,
    "warn"  : nop_,
    "info"  : nop_,
    "log"   : nop_,
    "debug" : nop_,
    "trace" : nop_,
};

const consoleLogMap_ = {
    "error" : { "level": logLevels[ "ERROR" ], "func": console.error },
    "warn"  : { "level": logLevels[ "WARN"  ], "func": console.warn  },
    "info"  : { "level": logLevels[ "INFO"  ], "func": console.info  },
    "log"   : { "level": logLevels[ "LOG"   ], "func": console.log   },
    "debug" : { "level": logLevels[ "DEBUG" ], "func": console.debug },
    "trace" : { "level": logLevels[ "TRACE" ], "func": console.trace },
};

setLevel( logLevels.DEFAULT );

/**
 * Provides definitions that are shared throughout the application.
 * @module
 */


/*- Script Execution Starts Here ---------------------------------------------*/

log( "Executing script in shared-definitions.js module...");

/*---------------------------------------------------------------------------*/
/* 1.0 SHARED TYPEDEFS                                                       */
/*---------------------------------------------------------------------------*/

/**
 * Provides a type definition for a JS string which defines the name of a channel.
 *
 * @typedef module:shared-definitions.WicaChannelName
 */

/**
 * Provides a union type definition for the filtering possibilities that may be configured on a wica channel.
 *
 * See {@link module:shared-definitions.WicaChannelFilterTypeAllValueSampler WicaChannelFilterTypeAllValueSampler},
 *     {@link module:shared-definitions.WicaChannelFilterTypeLatestValueSampler WicaChannelFilterTypeLatestValueSampler},
 *     {@link module:shared-definitions.WicaChannelFilterTypeFixedCycleSampler WicaChannelFilterTypeFixedCycleSampler},
 *     {@link module:shared-definitions.WicaChannelFilterTypeRateLimitingSampler WicaChannelFilterTypeRateLimitingSampler},
 *     and {@link module:shared-definitions.WicaChannelFilterTypeChangeFilteringSampler WicaChannelFilterTypeChangeFilteringSampler}.
 *
 * @typedef module:shared-definitions.WicaChannelFilterType
 */

/**
 * Provides a type definition for a filter that "does nothing", passing through all values obtained from the
 * channel's data source.
 *
 * @typedef module:shared-definitions.WicaChannelFilterTypeAllValueSampler
 * @property {string} filterType - "all-value" - the string literal that configures this type of filter.
 */

/**
 * Provides a type definition for a filter that passes through only the latest values received from the
 * channel during the wica server's previous value update sampling time window.
 *
 * @typedef module:shared-definitions.WicaChannelFilterTypeLatestValueSampler
 * @property {string} filterType - "last-n" - the string literal that configures this type of filter.
 * @property {number} n - The maximum number of values to pass through the filter on each update cycle.
 */

/**
 * Provides a type definition for a filter that passes through values obtained from the channel's data source
 * on a fixed one-in-N sampling basis.
 *
 * @typedef module:shared-definitions.WicaChannelFilterTypeFixedCycleSampler
 * @property {string} filterType - "one-in-m" - the string literal that configures this type of filter.
 * @property {number} m - The sampling cycle length.
 */

/**
 * Provides a type definition for a filter that passes through values obtained from the channel's data source based
 * on a minimum time interval between successive samples.
 *
 * @typedef module:shared-definitions.WicaChannelFilterTypeRateLimitingSampler
 * @property {string} filterType - "rate-limiter" - the string literal that configures this type of filter.
 * @property {number} interval - The minimum time duration between samples in milliseconds.
 */

/**
 *  Provides a type definition for a filter that that passes through values every time the input signal makes a
 *  transition whose absolute value exceeds the configured deadband. The filter operates only on channels whose
 *  underlying type is numeric; the information for all other channel types passes through unchanged.
 *
 * @typedef module:shared-definitions.WicaChannelFilterTypeChangeFilteringSampler
 * @property {string} filterType - "changes" - the string literal that configures this type of filter.
 * @property {number} deadband - Defines the absolute change which must occur in the input value in order for
 *     the new value to be passed through the filter.
 */

/**
 * Provides a type definition for a union type which describes the metadata information associated with a wica channel.
 *
 * See {@link module:shared-definitions.WicaChannelMetadataOther WicaChannelMetadataOther},
 * and {@link module:shared-definitions.WicaChannelMetadataEpics WicaChannelMetadataEpics}.
 *
 * @typedef module:shared-definitions.WicaChannelMetadata
 */

/**
 * Provides a type definition to describe the metadata associated with a channel based on a data source with
 * minimal additional information.
 *
 * @typedef module:shared-definitions.WicaChannelMetadataOther
 * @property type {string} - One of: "REAL", "INTEGER", "STRING", "REAL_ARRAY", "INTEGER_ARRAY", "STRING_ARRAY".
 *     This property is always present.
 */

/**
 * Provides a type definition to describe the metadata associated with a channel based on an EPICS data source.
 *
 * The published properties may vary according to the EPICS record that publishes the EPICS channel. A combination
 * of any or all of the following properties is possible.
 *
 * @typedef module:shared-definitions.WicaChannelMetadataEpics
 * @property type {string} - One of: "REAL", "INTEGER", "STRING", "REAL_ARRAY", "INTEGER_ARRAY", "STRING_ARRAY".
 * @property egu {string} -  Engineering Units in which the channel's value will be expressed.
 * @property prec {number} - The precision in which the channel's value will be expressed. Applies only to numeric types.
 * @property hopr {number} - High Operating Range.
 * @property lopr {number} - Low Operating Range.
 * @property drvh {number} - Drive High Control Limit.
 * @property drvl {number} - Drive Low Control Limit.
 * @property hihi {number} - Upper Alarm Limit.
 * @property lolo {number} - Lower Alarm Limit.
 * @property high {number} - Upper Warning Limit.
 * @property low {number} - Lower Warning Limit.
 */

/**
 * Provides a type definition for a JS Object that provides channel value information.
 *
 * The value information includes the raw channel value, the timestamp at which the value was obtained, and the
 * channel alarm status.
 *
 * @typedef module:shared-definitions.WicaChannelValue
 *
 * @property val {string|null} - JSON String representation of the current value. Set to NULL if the channel's
 *     data source is offline, or otherwise unavailable.
 *
 * @property sevr {number} - [Alarm Severity] -  Present if the WicaStreamProperty 'includeAlarmInfo' is true. The
 *    following values are defined (0 = No Alarm; 1 = Minor Alarm, 2 = Major Alarm)
 *
 * @property ts {string} - [Timestamp] - present if the WicaStreamProperty 'includeTimestamp' is true.
 */


/*---------------------------------------------------------------------------*/
/* 2.0 SHARED OBJECT LITERALS                                                */
/*---------------------------------------------------------------------------*/

/**
 * JS Object that defines the HTML element attributes used by the
 * {@link module:document-event-manager.DocumentEventManager DocumentEventManager} in its mission to fire
 * events on wica-aware elements.
 *
 * @property {string} eventHandler="onchange" - The name of the attribute which will be
 *     examined to look for a wica custom event handler.
 */
const WicaElementEventAttributes = Object.freeze ({
    eventHandler: "onchange"
} );

/**
 * JS Object that defines the HTML element attributes used by the
 * {@link module:document-stream-connector.DocumentStreamConnector DocumentStreamConnector} when communicating
 * with the Wica server.
 *
 * @property {string} streamState="data-wica-stream-state" - The name of the element attribute which reflects
 *     the state of the connection to the wica server's data stream. Format: JS string literal with possible
 *     values: [ "connect-CCC", "opened-XXX", "closed-XXX" ], where CCC represents the incrementing connection
 *     request counter and XXX the id of the last stream that was opened.
 *
 * @property {string} channelName="data-wica-channel-name" - The name of the element attribute which specifies
 *     the wica channel name. This is the minimum information that must be present for an element to be
 *     considered "wica-aware". Format: JS string literal.
 *
 * @property {string} channelProperties="data-wica-channel-properties" - The name of the element attribute which
 *     specifies the wica channel properties. Format: JSON string literal, representing JS
 *     {@link module:shared-definitions~WicaChannelProperties WicaChannelProperties} object.
 *
 * @property {string} channelConnectionState="data-wica-channel-connection-state" - The name of the element
 *     attribute which reflects the state of the connection between the wica server and the wica
 *     channel's data source. Format: JS string literal with possible values: ["connecting-N", "opened-X",
 *     "closed-X"], where N represents the incrementing count of connection attempts and X represents the
 *     stream ID assigned by the server.
 *
 * @property {string} channelMetadata="data-wica-channel-metadata" - The name of the element attribute which
 *     reflects the metadata obtained most recently from the wica channel. Format: JSON string literal,
 *     representing JS {@link module:shared-definitions.WicaChannelMetadata WicaChannelMetadata} object.
 *
 * @property {string} channelValueArray="data-wica-channel-value-array" - The name of the attribute which
 *     reflects the most recently obtained values from the wica channel. Format: JSON string literal,
 *     representing JS Array of {@link module:shared-definitions.WicaChannelValue WicaChannelValue} objects.
 *
 * @property {string} channelValueLatest="data-wica-channel-value-latest" - The name of the attribute which is
 *     set to reflect the last value obtained from the channel. Format: JSON string literal, representing JS
 *     {@link module:shared-definitions.WicaChannelValue WicaChannelValue} object.
 *
 * @property {string} channelAlarmState="data-wica-channel-alarm-state" - The name of the attribute which reflects
 *     the alarm status most recently obtained from the channel. Format: JS number literal with possible values:
 *     [ 0 (= "NO_ALARM"), 1 (= "MINOR_ALARM"), 2 (= "MAJOR_ALARM"), 3 (= "INVALID_ALARM") ].
 */
const WicaElementConnectionAttributes = Object.freeze ({
    streamState:            "data-wica-stream-state",
    channelName:            "data-wica-channel-name",
    channelProperties:      "data-wica-channel-props",
    channelConnectionState: "data-wica-channel-connection-state",
    channelMetadata:        "data-wica-channel-metadata",
    channelValueArray:      "data-wica-channel-value-array",
    channelValueLatest:     "data-wica-channel-value-latest",
    channelAlarmState:      "data-wica-channel-alarm-state"
} );

/**
 * JS Object that defines the HTML element attributes used by the
 * {@link module:document-text-renderer.DocumentTextRenderer DocumentTextRenderer} when rendering the element's
 * visual state.
 *
 * @property {string} tooltip="data-wica-tooltip" - The name of the attribute which specifies the tooltip to
 *     be displayed when the browser's cursor hovers over the element. When not explicitly set by the developer
 *     the wica channel name will be assigned to this attribute instead. Format: JS string literal.
 *
 * @property {string} renderingProperties="data-wica-rendering-props" - The name of the attribute which provides
 *     other miscellaneous properties which affect the way the element is rendered. Format: JSON string literal
 *     representing JS {@link module:shared-definitions~WicaRenderingProperties WicaRenderingProperties}
 *     object.
 */
const WicaElementRenderingAttributes = Object.freeze ({
    tooltip:             "data-wica-tooltip",
    renderingProperties: "data-wica-rendering-props"
} );

/**
 * JS Object that defines the properties and default values used by the
 * {@link module:document-text-renderer.DocumentTextRenderer DocumentTextRenderer} when rendering the element's
 * visual state.
 *
 * @property {boolean} [disable=false] - Disables rendering for this channel.
 * @property {string} [units=""] - The units to be displayed when rendering numeric information. When this
 *     property is specified it will be used. When not specified an attempt will be made to obtain the units
 *     from the metadata.
 * @property {boolean} [exp=false] - Sets the rendering format for channels which return numeric data. Possible
 *     values: [true (use exponential format, eg 1.27E-1), false (use fixed decimal point format, eg 0.127)].
 * @property {number} [prec=8] - The precision (= number of digits after the decimal point) to be used for
 *     channels which return numeric data.
 */
const WicaRenderingProperties = Object.freeze ({
    disable: false,
    exp: false,
    prec: 8,
    units: ""
} );

/**
 * JS Object that defines the properties and default values supported by a WicaStream.
 *
 * @property {number} [hbflux=15000] - The interval in milliseconds between heartbeat messages.
 * @property {number} [metaflux=100] The interval in milliseconds between transmitting successive
 *    Server-Sent-Event (SSE) messages with the latest wica channel metadata.
 * @property {number} [monflux=100] The interval in milliseconds between transmitting successive
 *    Server-Sent-Event (SSE) messages with the latest wica channel monitored values.
 * @property {number} [pollflux=1000] The interval in milliseconds between transmitting successive
 *    Server-Sent-Event (SSE) messages with the latest wica channel polled values.
 * @property {number} [daqmode=monitor] - The default data acquisition mode.
 * @property {number} [pollint=1000] - The default polling interval in milliseconds.
 * @property {number} [prec=6] - The precision (= number of digits after the decimal point) to be used when
 *     sending numeric information.
 * @property {string} [fields=val;sevr] - A semicolon delimited list defining the data fields that
 *    should be included by default in the stream of WicaChannelValues.
 */
const WicaStreamProperties = Object.freeze ({
    hbflux: 15000,
    metaflux: 100,
    monflux: 200,
    pollflux: 1000,
    daqmode: "monitor",
    pollint: 1000,
    prec: 3,
    fields: "val;sevr"
} );

/**
 * JS Object that defines the properties supported by a WicaChannel and their default values.
 *
 * @property {number} [daqmode] - The data acquisition mode. Optional parameter which overrides
 *     property set on the stream.
 * @property {number} [pollint] - The interval between successive polls of the channel value.
 * @property {string} [fields] - A semicolon delimited list defining the data fields that
 *    should be included when sending value information for this channel.
 * @property {number} [prec] - The precision (= number of digits after the decimal point) to be
 *     used when sending numeric information.
 * @property {WicaChannelFilterType} [filter=WicaChannelFilterTypeLatestValueSampler] - The type of filtering to be
 *     used on the channel. See {@link module:shared-definitions.WicaChannelFilterType WicaChannelFilterType}.
 * @property {string} [n=1] - The filter number of samples.
 *     See {@link module:shared-definitions.WicaChannelFilterTypeLatestValueSampler WicaChannelFilterTypeLatestValueSampler}.
 * @property {string} [m=1] - The filter cycle length.
 *     See {@link module:shared-definitions.WicaChannelFilterTypeFixedCycleSampler WicaChannelFilterTypeFixedCycleSampler}.
 * @property {string} [interval=1] - The filter sampling interval.
 *     See {@link module:shared-definitions.WicaChannelFilterTypeRateLimitingSampler WicaChannelFilterTypeRateLimitingSampler}.
 * @property {string} [deadband=1.0] - The filter deadband.
 *     See {@link module:shared-definitions.WicaChannelFilterTypeChangeFilteringSampler WicaChannelFilterTypeChangeFilteringSampler}.
 */
const WicaChannelProperties = Object.freeze ({
    daqmode: null,
    pollint: null,
    fields: null,
    prec: null,
    filter: "last-n",
    n: 1,
    m: 1,
    interval: 1,
    deadband: 1.0
} );

// This is a generated file. Do not edit.
var Space_Separator = /[\u1680\u2000-\u200A\u202F\u205F\u3000]/;
var ID_Start = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/;
var ID_Continue = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/;

var unicode = {
    Space_Separator: Space_Separator,
    ID_Start: ID_Start,
    ID_Continue: ID_Continue
};

var util = {
    isSpaceSeparator (c) {
        return unicode.Space_Separator.test(c)
    },

    isIdStartChar (c) {
        return (
            (c >= 'a' && c <= 'z') ||
            (c >= 'A' && c <= 'Z') ||
            (c === '$') || (c === '_') ||
            unicode.ID_Start.test(c)
        )
    },

    isIdContinueChar (c) {
        return (
            (c >= 'a' && c <= 'z') ||
            (c >= 'A' && c <= 'Z') ||
            (c >= '0' && c <= '9') ||
            (c === '$') || (c === '_') ||
            (c === '\u200C') || (c === '\u200D') ||
            unicode.ID_Continue.test(c)
        )
    },

    isDigit (c) {
        return /[0-9]/.test(c)
    },

    isHexDigit (c) {
        return /[0-9A-Fa-f]/.test(c)
    },
};

let source;
let parseState;
let stack;
let pos;
let line;
let column;
let token;
let key;
let root;

var parse = function parse (text, reviver) {
    source = String(text);
    parseState = 'start';
    stack = [];
    pos = 0;
    line = 1;
    column = 0;
    token = undefined;
    key = undefined;
    root = undefined;

    do {
        token = lex();

        // This code is unreachable.
        // if (!parseStates[parseState]) {
        //     throw invalidParseState()
        // }

        parseStates[parseState]();
    } while (token.type !== 'eof')

    if (typeof reviver === 'function') {
        return internalize({'': root}, '', reviver)
    }

    return root
};

function internalize (holder, name, reviver) {
    const value = holder[name];
    if (value != null && typeof value === 'object') {
        for (const key in value) {
            const replacement = internalize(value, key, reviver);
            if (replacement === undefined) {
                delete value[key];
            } else {
                value[key] = replacement;
            }
        }
    }

    return reviver.call(holder, name, value)
}

let lexState;
let buffer;
let doubleQuote;
let sign;
let c;

function lex () {
    lexState = 'default';
    buffer = '';
    doubleQuote = false;
    sign = 1;

    for (;;) {
        c = peek();

        // This code is unreachable.
        // if (!lexStates[lexState]) {
        //     throw invalidLexState(lexState)
        // }

        const token = lexStates[lexState]();
        if (token) {
            return token
        }
    }
}

function peek () {
    if (source[pos]) {
        return String.fromCodePoint(source.codePointAt(pos))
    }
}

function read () {
    const c = peek();

    if (c === '\n') {
        line++;
        column = 0;
    } else if (c) {
        column += c.length;
    } else {
        column++;
    }

    if (c) {
        pos += c.length;
    }

    return c
}

const lexStates = {
    default () {
        switch (c) {
            case '\t':
            case '\v':
            case '\f':
            case ' ':
            case '\u00A0':
            case '\uFEFF':
            case '\n':
            case '\r':
            case '\u2028':
            case '\u2029':
                read();
                return

            case '/':
                read();
                lexState = 'comment';
                return

            case undefined:
                read();
                return newToken('eof')
        }

        if (util.isSpaceSeparator(c)) {
            read();
            return
        }

        // This code is unreachable.
        // if (!lexStates[parseState]) {
        //     throw invalidLexState(parseState)
        // }

        return lexStates[parseState]()
    },

    comment () {
        switch (c) {
            case '*':
                read();
                lexState = 'multiLineComment';
                return

            case '/':
                read();
                lexState = 'singleLineComment';
                return
        }

        throw invalidChar(read())
    },

    multiLineComment () {
        switch (c) {
            case '*':
                read();
                lexState = 'multiLineCommentAsterisk';
                return

            case undefined:
                throw invalidChar(read())
        }

        read();
    },

    multiLineCommentAsterisk () {
        switch (c) {
            case '*':
                read();
                return

            case '/':
                read();
                lexState = 'default';
                return

            case undefined:
                throw invalidChar(read())
        }

        read();
        lexState = 'multiLineComment';
    },

    singleLineComment () {
        switch (c) {
            case '\n':
            case '\r':
            case '\u2028':
            case '\u2029':
                read();
                lexState = 'default';
                return

            case undefined:
                read();
                return newToken('eof')
        }

        read();
    },

    value () {
        switch (c) {
            case '{':
            case '[':
                return newToken('punctuator', read())

            case 'n':
                read();
                literal('ull');
                return newToken('null', null)

            case 't':
                read();
                literal('rue');
                return newToken('boolean', true)

            case 'f':
                read();
                literal('alse');
                return newToken('boolean', false)

            case '-':
            case '+':
                if (read() === '-') {
                    sign = -1;
                }

                lexState = 'sign';
                return

            case '.':
                buffer = read();
                lexState = 'decimalPointLeading';
                return

            case '0':
                buffer = read();
                lexState = 'zero';
                return

            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                buffer = read();
                lexState = 'decimalInteger';
                return

            case 'I':
                read();
                literal('nfinity');
                return newToken('numeric', Infinity)

            case 'N':
                read();
                literal('aN');
                return newToken('numeric', NaN)

            case '"':
            case "'":
                doubleQuote = (read() === '"');
                buffer = '';
                lexState = 'string';
                return
        }

        throw invalidChar(read())
    },

    identifierNameStartEscape () {
        if (c !== 'u') {
            throw invalidChar(read())
        }

        read();
        const u = unicodeEscape();
        switch (u) {
            case '$':
            case '_':
                break

            default:
                if (!util.isIdStartChar(u)) {
                    throw invalidIdentifier()
                }

                break
        }

        buffer += u;
        lexState = 'identifierName';
    },

    identifierName () {
        switch (c) {
            case '$':
            case '_':
            case '\u200C':
            case '\u200D':
                buffer += read();
                return

            case '\\':
                read();
                lexState = 'identifierNameEscape';
                return
        }

        if (util.isIdContinueChar(c)) {
            buffer += read();
            return
        }

        return newToken('identifier', buffer)
    },

    identifierNameEscape () {
        if (c !== 'u') {
            throw invalidChar(read())
        }

        read();
        const u = unicodeEscape();
        switch (u) {
            case '$':
            case '_':
            case '\u200C':
            case '\u200D':
                break

            default:
                if (!util.isIdContinueChar(u)) {
                    throw invalidIdentifier()
                }

                break
        }

        buffer += u;
        lexState = 'identifierName';
    },

    sign () {
        switch (c) {
            case '.':
                buffer = read();
                lexState = 'decimalPointLeading';
                return

            case '0':
                buffer = read();
                lexState = 'zero';
                return

            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                buffer = read();
                lexState = 'decimalInteger';
                return

            case 'I':
                read();
                literal('nfinity');
                return newToken('numeric', sign * Infinity)

            case 'N':
                read();
                literal('aN');
                return newToken('numeric', NaN)
        }

        throw invalidChar(read())
    },

    zero () {
        switch (c) {
            case '.':
                buffer += read();
                lexState = 'decimalPoint';
                return

            case 'e':
            case 'E':
                buffer += read();
                lexState = 'decimalExponent';
                return

            case 'x':
            case 'X':
                buffer += read();
                lexState = 'hexadecimal';
                return
        }

        return newToken('numeric', sign * 0)
    },

    decimalInteger () {
        switch (c) {
            case '.':
                buffer += read();
                lexState = 'decimalPoint';
                return

            case 'e':
            case 'E':
                buffer += read();
                lexState = 'decimalExponent';
                return
        }

        if (util.isDigit(c)) {
            buffer += read();
            return
        }

        return newToken('numeric', sign * Number(buffer))
    },

    decimalPointLeading () {
        if (util.isDigit(c)) {
            buffer += read();
            lexState = 'decimalFraction';
            return
        }

        throw invalidChar(read())
    },

    decimalPoint () {
        switch (c) {
            case 'e':
            case 'E':
                buffer += read();
                lexState = 'decimalExponent';
                return
        }

        if (util.isDigit(c)) {
            buffer += read();
            lexState = 'decimalFraction';
            return
        }

        return newToken('numeric', sign * Number(buffer))
    },

    decimalFraction () {
        switch (c) {
            case 'e':
            case 'E':
                buffer += read();
                lexState = 'decimalExponent';
                return
        }

        if (util.isDigit(c)) {
            buffer += read();
            return
        }

        return newToken('numeric', sign * Number(buffer))
    },

    decimalExponent () {
        switch (c) {
            case '+':
            case '-':
                buffer += read();
                lexState = 'decimalExponentSign';
                return
        }

        if (util.isDigit(c)) {
            buffer += read();
            lexState = 'decimalExponentInteger';
            return
        }

        throw invalidChar(read())
    },

    decimalExponentSign () {
        if (util.isDigit(c)) {
            buffer += read();
            lexState = 'decimalExponentInteger';
            return
        }

        throw invalidChar(read())
    },

    decimalExponentInteger () {
        if (util.isDigit(c)) {
            buffer += read();
            return
        }

        return newToken('numeric', sign * Number(buffer))
    },

    hexadecimal () {
        if (util.isHexDigit(c)) {
            buffer += read();
            lexState = 'hexadecimalInteger';
            return
        }

        throw invalidChar(read())
    },

    hexadecimalInteger () {
        if (util.isHexDigit(c)) {
            buffer += read();
            return
        }

        return newToken('numeric', sign * Number(buffer))
    },

    string () {
        switch (c) {
            case '\\':
                read();
                buffer += escape();
                return

            case '"':
                if (doubleQuote) {
                    read();
                    return newToken('string', buffer)
                }

                buffer += read();
                return

            case "'":
                if (!doubleQuote) {
                    read();
                    return newToken('string', buffer)
                }

                buffer += read();
                return

            case '\n':
            case '\r':
                throw invalidChar(read())

            case '\u2028':
            case '\u2029':
                separatorChar(c);
                break

            case undefined:
                throw invalidChar(read())
        }

        buffer += read();
    },

    start () {
        switch (c) {
            case '{':
            case '[':
                return newToken('punctuator', read())

            // This code is unreachable since the default lexState handles eof.
            // case undefined:
            //     return newToken('eof')
        }

        lexState = 'value';
    },

    beforePropertyName () {
        switch (c) {
            case '$':
            case '_':
                buffer = read();
                lexState = 'identifierName';
                return

            case '\\':
                read();
                lexState = 'identifierNameStartEscape';
                return

            case '}':
                return newToken('punctuator', read())

            case '"':
            case "'":
                doubleQuote = (read() === '"');
                lexState = 'string';
                return
        }

        if (util.isIdStartChar(c)) {
            buffer += read();
            lexState = 'identifierName';
            return
        }

        throw invalidChar(read())
    },

    afterPropertyName () {
        if (c === ':') {
            return newToken('punctuator', read())
        }

        throw invalidChar(read())
    },

    beforePropertyValue () {
        lexState = 'value';
    },

    afterPropertyValue () {
        switch (c) {
            case ',':
            case '}':
                return newToken('punctuator', read())
        }

        throw invalidChar(read())
    },

    beforeArrayValue () {
        if (c === ']') {
            return newToken('punctuator', read())
        }

        lexState = 'value';
    },

    afterArrayValue () {
        switch (c) {
            case ',':
            case ']':
                return newToken('punctuator', read())
        }

        throw invalidChar(read())
    },

    end () {
        // This code is unreachable since it's handled by the default lexState.
        // if (c === undefined) {
        //     read()
        //     return newToken('eof')
        // }

        throw invalidChar(read())
    },
};

function newToken (type, value) {
    return {
        type,
        value,
        line,
        column,
    }
}

function literal (s) {
    for (const c of s) {
        const p = peek();

        if (p !== c) {
            throw invalidChar(read())
        }

        read();
    }
}

function escape () {
    const c = peek();
    switch (c) {
        case 'b':
            read();
            return '\b'

        case 'f':
            read();
            return '\f'

        case 'n':
            read();
            return '\n'

        case 'r':
            read();
            return '\r'

        case 't':
            read();
            return '\t'

        case 'v':
            read();
            return '\v'

        case '0':
            read();
            if (util.isDigit(peek())) {
                throw invalidChar(read())
            }

            return '\0'

        case 'x':
            read();
            return hexEscape()

        case 'u':
            read();
            return unicodeEscape()

        case '\n':
        case '\u2028':
        case '\u2029':
            read();
            return ''

        case '\r':
            read();
            if (peek() === '\n') {
                read();
            }

            return ''

        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            throw invalidChar(read())

        case undefined:
            throw invalidChar(read())
    }

    return read()
}

function hexEscape () {
    let buffer = '';
    let c = peek();

    if (!util.isHexDigit(c)) {
        throw invalidChar(read())
    }

    buffer += read();

    c = peek();
    if (!util.isHexDigit(c)) {
        throw invalidChar(read())
    }

    buffer += read();

    return String.fromCodePoint(parseInt(buffer, 16))
}

function unicodeEscape () {
    let buffer = '';
    let count = 4;

    while (count-- > 0) {
        const c = peek();
        if (!util.isHexDigit(c)) {
            throw invalidChar(read())
        }

        buffer += read();
    }

    return String.fromCodePoint(parseInt(buffer, 16))
}

const parseStates = {
    start () {
        if (token.type === 'eof') {
            throw invalidEOF()
        }

        push();
    },

    beforePropertyName () {
        switch (token.type) {
            case 'identifier':
            case 'string':
                key = token.value;
                parseState = 'afterPropertyName';
                return

            case 'punctuator':
                // This code is unreachable since it's handled by the lexState.
                // if (token.value !== '}') {
                //     throw invalidToken()
                // }

                pop();
                return

            case 'eof':
                throw invalidEOF()
        }

        // This code is unreachable since it's handled by the lexState.
        // throw invalidToken()
    },

    afterPropertyName () {
        // This code is unreachable since it's handled by the lexState.
        // if (token.type !== 'punctuator' || token.value !== ':') {
        //     throw invalidToken()
        // }

        if (token.type === 'eof') {
            throw invalidEOF()
        }

        parseState = 'beforePropertyValue';
    },

    beforePropertyValue () {
        if (token.type === 'eof') {
            throw invalidEOF()
        }

        push();
    },

    beforeArrayValue () {
        if (token.type === 'eof') {
            throw invalidEOF()
        }

        if (token.type === 'punctuator' && token.value === ']') {
            pop();
            return
        }

        push();
    },

    afterPropertyValue () {
        // This code is unreachable since it's handled by the lexState.
        // if (token.type !== 'punctuator') {
        //     throw invalidToken()
        // }

        if (token.type === 'eof') {
            throw invalidEOF()
        }

        switch (token.value) {
            case ',':
                parseState = 'beforePropertyName';
                return

            case '}':
                pop();
        }

        // This code is unreachable since it's handled by the lexState.
        // throw invalidToken()
    },

    afterArrayValue () {
        // This code is unreachable since it's handled by the lexState.
        // if (token.type !== 'punctuator') {
        //     throw invalidToken()
        // }

        if (token.type === 'eof') {
            throw invalidEOF()
        }

        switch (token.value) {
            case ',':
                parseState = 'beforeArrayValue';
                return

            case ']':
                pop();
        }

        // This code is unreachable since it's handled by the lexState.
        // throw invalidToken()
    },

    end () {
        // This code is unreachable since it's handled by the lexState.
        // if (token.type !== 'eof') {
        //     throw invalidToken()
        // }
    },
};

function push () {
    let value;

    switch (token.type) {
        case 'punctuator':
            switch (token.value) {
                case '{':
                    value = {};
                    break

                case '[':
                    value = [];
                    break
            }

            break

        case 'null':
        case 'boolean':
        case 'numeric':
        case 'string':
            value = token.value;
            break

        // This code is unreachable.
        // default:
        //     throw invalidToken()
    }

    if (root === undefined) {
        root = value;
    } else {
        const parent = stack[stack.length - 1];
        if (Array.isArray(parent)) {
            parent.push(value);
        } else {
            parent[key] = value;
        }
    }

    if (value !== null && typeof value === 'object') {
        stack.push(value);

        if (Array.isArray(value)) {
            parseState = 'beforeArrayValue';
        } else {
            parseState = 'beforePropertyName';
        }
    } else {
        const current = stack[stack.length - 1];
        if (current == null) {
            parseState = 'end';
        } else if (Array.isArray(current)) {
            parseState = 'afterArrayValue';
        } else {
            parseState = 'afterPropertyValue';
        }
    }
}

function pop () {
    stack.pop();

    const current = stack[stack.length - 1];
    if (current == null) {
        parseState = 'end';
    } else if (Array.isArray(current)) {
        parseState = 'afterArrayValue';
    } else {
        parseState = 'afterPropertyValue';
    }
}

// This code is unreachable.
// function invalidParseState () {
//     return new Error(`JSON5: invalid parse state '${parseState}'`)
// }

// This code is unreachable.
// function invalidLexState (state) {
//     return new Error(`JSON5: invalid lex state '${state}'`)
// }

function invalidChar (c) {
    if (c === undefined) {
        return syntaxError(`JSON5: invalid end of input at ${line}:${column}`)
    }

    return syntaxError(`JSON5: invalid character '${formatChar(c)}' at ${line}:${column}`)
}

function invalidEOF () {
    return syntaxError(`JSON5: invalid end of input at ${line}:${column}`)
}

// This code is unreachable.
// function invalidToken () {
//     if (token.type === 'eof') {
//         return syntaxError(`JSON5: invalid end of input at ${line}:${column}`)
//     }

//     const c = String.fromCodePoint(token.value.codePointAt(0))
//     return syntaxError(`JSON5: invalid character '${formatChar(c)}' at ${line}:${column}`)
// }

function invalidIdentifier () {
    column -= 5;
    return syntaxError(`JSON5: invalid identifier character at ${line}:${column}`)
}

function separatorChar (c) {
    console.warn(`JSON5: '${formatChar(c)}' in strings is not valid ECMAScript; consider escaping`);
}

function formatChar (c) {
    const replacements = {
        "'": "\\'",
        '"': '\\"',
        '\\': '\\\\',
        '\b': '\\b',
        '\f': '\\f',
        '\n': '\\n',
        '\r': '\\r',
        '\t': '\\t',
        '\v': '\\v',
        '\0': '\\0',
        '\u2028': '\\u2028',
        '\u2029': '\\u2029',
    };

    if (replacements[c]) {
        return replacements[c]
    }

    if (c < ' ') {
        const hexString = c.charCodeAt(0).toString(16);
        return '\\x' + ('00' + hexString).substring(hexString.length)
    }

    return c
}

function syntaxError (message) {
    const err = new SyntaxError(message);
    err.lineNumber = line;
    err.columnNumber = column;
    return err
}

var stringify = function stringify (value, replacer, space) {
    const stack = [];
    let indent = '';
    let propertyList;
    let replacerFunc;
    let gap = '';
    let quote;

    if (
        replacer != null &&
        typeof replacer === 'object' &&
        !Array.isArray(replacer)
    ) {
        space = replacer.space;
        quote = replacer.quote;
        replacer = replacer.replacer;
    }

    if (typeof replacer === 'function') {
        replacerFunc = replacer;
    } else if (Array.isArray(replacer)) {
        propertyList = [];
        for (const v of replacer) {
            let item;

            if (typeof v === 'string') {
                item = v;
            } else if (
                typeof v === 'number' ||
                v instanceof String ||
                v instanceof Number
            ) {
                item = String(v);
            }

            if (item !== undefined && propertyList.indexOf(item) < 0) {
                propertyList.push(item);
            }
        }
    }

    if (space instanceof Number) {
        space = Number(space);
    } else if (space instanceof String) {
        space = String(space);
    }

    if (typeof space === 'number') {
        if (space > 0) {
            space = Math.min(10, Math.floor(space));
            gap = '          '.substr(0, space);
        }
    } else if (typeof space === 'string') {
        gap = space.substr(0, 10);
    }

    return serializeProperty('', {'': value})

    function serializeProperty (key, holder) {
        let value = holder[key];
        if (value != null) {
            if (typeof value.toJSON5 === 'function') {
                value = value.toJSON5(key);
            } else if (typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }
        }

        if (replacerFunc) {
            value = replacerFunc.call(holder, key, value);
        }

        if (value instanceof Number) {
            value = Number(value);
        } else if (value instanceof String) {
            value = String(value);
        } else if (value instanceof Boolean) {
            value = value.valueOf();
        }

        switch (value) {
            case null: return 'null'
            case true: return 'true'
            case false: return 'false'
        }

        if (typeof value === 'string') {
            return quoteString(value)
        }

        if (typeof value === 'number') {
            return String(value)
        }

        if (typeof value === 'object') {
            return Array.isArray(value) ? serializeArray(value) : serializeObject(value)
        }

        return undefined
    }

    function quoteString (value) {
        const quotes = {
            "'": 0.1,
            '"': 0.2,
        };

        const replacements = {
            "'": "\\'",
            '"': '\\"',
            '\\': '\\\\',
            '\b': '\\b',
            '\f': '\\f',
            '\n': '\\n',
            '\r': '\\r',
            '\t': '\\t',
            '\v': '\\v',
            '\0': '\\0',
            '\u2028': '\\u2028',
            '\u2029': '\\u2029',
        };

        let product = '';

        for (let i = 0; i < value.length; i++) {
            const c = value[i];
            switch (c) {
                case "'":
                case '"':
                    quotes[c]++;
                    product += c;
                    continue

                case '\0':
                    if (util.isDigit(value[i + 1])) {
                        product += '\\x00';
                        continue
                    }
            }

            if (replacements[c]) {
                product += replacements[c];
                continue
            }

            if (c < ' ') {
                let hexString = c.charCodeAt(0).toString(16);
                product += '\\x' + ('00' + hexString).substring(hexString.length);
                continue
            }

            product += c;
        }

        const quoteChar = quote || Object.keys(quotes).reduce((a, b) => (quotes[a] < quotes[b]) ? a : b);

        product = product.replace(new RegExp(quoteChar, 'g'), replacements[quoteChar]);

        return quoteChar + product + quoteChar
    }

    function serializeObject (value) {
        if (stack.indexOf(value) >= 0) {
            throw TypeError('Converting circular structure to JSON5')
        }

        stack.push(value);

        let stepback = indent;
        indent = indent + gap;

        let keys = propertyList || Object.keys(value);
        let partial = [];
        for (const key of keys) {
            const propertyString = serializeProperty(key, value);
            if (propertyString !== undefined) {
                let member = serializeKey(key) + ':';
                if (gap !== '') {
                    member += ' ';
                }
                member += propertyString;
                partial.push(member);
            }
        }

        let final;
        if (partial.length === 0) {
            final = '{}';
        } else {
            let properties;
            if (gap === '') {
                properties = partial.join(',');
                final = '{' + properties + '}';
            } else {
                let separator = ',\n' + indent;
                properties = partial.join(separator);
                final = '{\n' + indent + properties + ',\n' + stepback + '}';
            }
        }

        stack.pop();
        indent = stepback;
        return final
    }

    function serializeKey (key) {
        if (key.length === 0) {
            return quoteString(key)
        }

        const firstChar = String.fromCodePoint(key.codePointAt(0));
        if (!util.isIdStartChar(firstChar)) {
            return quoteString(key)
        }

        for (let i = firstChar.length; i < key.length; i++) {
            if (!util.isIdContinueChar(String.fromCodePoint(key.codePointAt(i)))) {
                return quoteString(key)
            }
        }

        return key
    }

    function serializeArray (value) {
        if (stack.indexOf(value) >= 0) {
            throw TypeError('Converting circular structure to JSON5')
        }

        stack.push(value);

        let stepback = indent;
        indent = indent + gap;

        let partial = [];
        for (let i = 0; i < value.length; i++) {
            const propertyString = serializeProperty(String(i), value);
            partial.push((propertyString !== undefined) ? propertyString : 'null');
        }

        let final;
        if (partial.length === 0) {
            final = '[]';
        } else {
            if (gap === '') {
                let properties = partial.join(',');
                final = '[' + properties + ']';
            } else {
                let separator = ',\n' + indent;
                let properties = partial.join(separator);
                final = '[\n' + indent + properties + ',\n' + stepback + ']';
            }
        }

        stack.pop();
        indent = stepback;
        return final
    }
};

const JSON5 = {
    parse,
    stringify,
};

var lib = JSON5;

/**
 * Provides support for parsing and stringifying JSON5.
 * @module
 */


/*- Script Execution Starts Here ---------------------------------------------*/

log( "Executing script in json5-wrapper.js module...");

/**
 * Wrapper for the JSON5 "flexible" parser that can handle real numbers sent as NaNs, Infinity etc.
 *
 * The following text was taken from the JSON5.org site. See: https://json5.org.
 *
 * Parses a JSON5 string, constructing the JavaScript value or object described by the string.
 * An optional reviver function can be provided to perform a transformation on the resulting
 * object before it is returned.
 *
 * @param {String} text - The string to parse as JSON5.
 *
 * @param {Object} [reviver] - If a function, this prescribes how the value originally produced
 *     by parsing is transformed, before being returned.
 *
 * @return {*} the object corresponding to the given JSON5 text.
 */
const parse$1 = function parse( text, reviver )
{
    return lib.parse( text, reviver );
};

/**
 * Wrapper for the JSON5 alternative stringifier.
 *
 * The following text was taken from the JSON5.org site. See: https://json5.org.
 *
 * Converts a JavaScript value to a JSON5 string, optionally replacing values if a replacer
 * function is specified, or optionally including only the specified properties if a replacer
 * array is specified.
 *
 * @param {string} value - The value to convert to a JSON5 string.
 *
 * @param {function} [replacer] - A function that alters the behavior of the stringification process, or
 *     an array of String and Number objects that serve as a whitelist for selecting/filtering
 *     the properties of the value object to be included in the JSON5 string. If this value
 *     is null or not provided, all properties of the object are included in the resulting
 *     JSON5 string.
 *
 * @param {string|number} [space] - A String or Number object that's used to insert white space into
 *     the output JSON5 string for readability purposes. If this is a Number, it indicates the
 *     number of space characters to use as white space; this number is capped at 10 (if it is
 *     greater, the value is just 10). Values less than 1 indicate that no space should be used.
 *     If this is a String, the string (or the first 10 characters of the string, if it's longer
 *     than that) is used as white space. If this parameter is not provided (or is null), no
 *     white space is used. If white space is used, trailing commas will be used in objects and
 *     arrays.
 *
 * @return {string} A JSON5 string representing the value.
 */
const stringify$1 = function( value, replacer, space )
{
    return lib.stringify( value, replacer, space );
};

/**
 * Loads the library. Invokes the callback handler when complete.
 *
 * @param callback the handler to callback when the library is loaded.
 */
const load = function( callback )
{
    callback();
};

/**
 * Provides support for creating and using Wica streams.
 * @module
 */

/*- Script Execution Starts Here ---------------------------------------------*/

log( "Executing script in stream-manager.js module...");

/**
 * Callback invoked when the stream connect sequence begins.
 *
 * @callback module:stream-manager.StreamConnectCallback
 * @property {number} count - The connection request counter. The counter, set to 1 initially, increments
 *     after every stream connection attempt. This information is useful mainly for debug purposes (for
 *     example for outputting a message to the console).
 */

/**
 * Callback invoked when the stream is opened (that's to say when the connection with the server
 * has been successfully established).
 *
 * @callback module:stream-manager.StreamOpenedCallback
 * @property {string} id - The ID of the stream that was opened. This information is useful mainly
 *    for debug purposes (for example for outputting a message to the console).
 */

/**
 * Callback invoked when the stream is closed (that's to say when the connection with the server
 * has been shut down).
 *
 * @callback module:stream-manager.StreamClosedCallback
 * @property {string} id - The ID of the stream that was closed. This information is useful mainly
 *    for debug purposes (for example for outputting a message to the console).
 */

/**
 * @callback module:stream-manager.ChannelMetadataUpdatedCallback
 * @property {Object.<WicaChannelName, WicaChannelMetadata>} metadataMap - Map of channel names and their
 *     associated metadata. See {@link module:shared-definitions.WicaChannelName WicaChannelName} and
 *     {@link module:shared-definitions.WicaChannelMetadata WicaChannelMetadata}.
 */

/**
 * @callback module:stream-manager.ChannelValuesUpdatedCallback
 * @property {Object.<WicaChannelName,WicaChannelValue[]>} valueMap - Map of channel names and array of
 *     associated values that have been received for the channel in chronological order.
 *     See {@link module:shared-definitions.WicaChannelName WicaChannelName} and
 *     {@link module:shared-definitions.WicaChannelValue WicaChannelValue}.
 */

/**
 * Provides support for creating a new WicaStream on the Wica server, for subscribing to it and for
 * publishing the received information.
 */
class StreamManager
{
    /**
     * Constructs a new instance.
     *
     * The returned object will remain in a dormant state until triggered by a call to the activate method.
     *
     * @param {string} serverUrl - The URL of the server to contact to request the creation of the new stream.
     *
     * @param {Object} streamConfiguration - The stream specification to be sent to the server. This includes
     *     the configuration of each of the stream's channels, together with, optionally, the stream properties
     *     object.
     *
     * @param {Array<WicaChannelName, WicaChannelProperties>} streamConfiguration.channels - Array specifying
     *     the configuration of each stream channel. See {@link module:shared-definitions.WicaChannelName WicaChannelName}
     *     and {@link module:shared-definitions~WicaChannelProperties WicaChannelProperties}.
     *
     * @param {WicaStreamProperties} [streamConfiguration.props] - The stream properties object.
     *     See {@link module:shared-definitions~WicaStreamProperties WicaStreamProperties}.
     *
     * @param {Object} connectionHandlers - Callbacks for handling connection state changes.
     * @param {StreamConnectCallback} connectionHandlers.streamConnect - Called when the stream manager begins
     *     a new connect sequence. This occurs after the stream manager activate method has been invoked, or
     *     if the stream manager doesn't see a stream heartbeat message within the expected time interval. See
     *     {@link module:stream-manager.StreamConnectCallback StreamConnectCallback}.
     * @param {StreamOpenedCallback} connectionHandlers.streamOpened - Called when the stream is opened. See
     *     {@link module:stream-manager.StreamOpenedCallback StreamOpenedCallback}.
     * @param {StreamClosedCallback} connectionHandlers.streamClosed - Called when the stream is opened. See
     *     {@link module:stream-manager.StreamClosedCallback StreamClosedCallback}.
     *
     * @param {Object} messageHandlers - Callbacks for handling data received from the SSE stream.
     * @param {ChannelMetadataUpdatedCallback} messageHandlers.channelMetadataUpdated - Called when channel
     *     metadata information is received. See
     *     {@link module:stream-manager.ChannelMetadataUpdatedCallback ChannelMetadataUpdatedCallback}.
     * @param {ChannelValuesUpdatedCallback} messageHandlers.channelValuesUpdated - Called when channel
     *     value information is received. See
     *     {@link module:stream-manager.ChannelValuesUpdatedCallback ChannelValuesUpdatedCallback}.
     *
     * @param {Object} options - Provides additional client-side configuration options.
     * @param {number} [options.streamTimeoutIntervalInSeconds] - Periodicity with which the stream's heartbeat
     *     message needs to be received before the manager will conclude that a communication outage has occurred.
     * @param {number} [options.streamReconnectIntervalInSeconds] - Period between successive reconnection
     *     attempts following a communication outage.
     * @param {boolean} [options.crossOriginCheckEnabled] - Whether this manager should perform a CORS check
     *     to verify that the origin of the event stream is the same as the origin from which this manager
     *     was loaded.
     */
    constructor( serverUrl, streamConfiguration, connectionHandlers, messageHandlers, options )
    {
        this.serverUrl = serverUrl;
        this.streamConfiguration = streamConfiguration;
        this.streamOpened = connectionHandlers.streamOpened;
        this.streamConnect = connectionHandlers.streamConnect;
        this.streamClosed = connectionHandlers.streamClosed;
        this.channelMetadataUpdated = messageHandlers.channelMetadataUpdated;
        this.channelValuesUpdated = messageHandlers.channelValuesUpdated;
        this.streamReconnectIntervalInSeconds = options.streamReconnectIntervalInSeconds;
        this.streamTimeoutIntervalInSeconds = options.streamTimeoutIntervalInSeconds;
        this.crossOriginCheckEnabled = options.crossOriginCheckEnabled;
        this.countdownInSeconds = 0;
        this.connectionRequestCounter = 1;
        this.activeStreamId = undefined;
    }

    /**
     * Activates this stream manager instance.
     *
     * More specifically this sets up a state machine to create and manage an active event stream
     * and for calling other handlers as required to track the evolving connection state and received
     * data.
     *
     * See also: {@link module:stream-manager.StreamManager#shutdown shutdown}.
     *
     * @implNote
     * The current implementation expects to receive a periodic "heartbeat" message to confirm
     * that the connection to the data server is ok. If the message is not received within the
     * allowed time window then the existing stream will be closed and a new stream will be
     * negotiated with the server.
     */
    activate()
    {
        // Activation has to wait until we received the callback that the
        // JSON5 library is loaded.
        load( () => this.startStreamMonitoring_() );
    }

    /**
     * Shuts down this stream manager instance.
     *
     * See also: {@link module:stream-manager.StreamManager#activate activate}.
     */
    shutdown()
    {
        // If the stream manager is activated cancel the interval timer.
        if( this.intervalTimer !== undefined )
        {
            clearInterval( this.intervalTimer );
        }

        // Cancel the most recently established stream (if one has been established).
        if ( this.activeStreamId !== undefined )
        {
            this.deleteStream_( this.activeStreamId );
        }
    }

    /**
     * Sends a DELETE request to the Wica Server to delete an existing stream.
     *
     * @private
     * @param {string} streamId the ID of the stream to be deleted.
     */
    deleteStream_( streamId )
    {
        // Create a request object which will be used to ask the server to create the new stream.
        const xhttp = new XMLHttpRequest();

        // Add a handler which will print an error message if the stream couldn't be deleted.
        xhttp.onerror = () => {
        warn( "XHTTP error when sending request to delete event source" );
    };

        // Add a handler which will subscribe to the stream once it has been created.
        xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            const deletedId = xhttp.responseText;
            info( "Stream deleted, deleted id was: ", deletedId );
        }
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status !== 200) {
            warn( "Error when sending delete stream request." );
        }
    };

        // Now send off the request. Note async is FALSE so that the page does not
        // get a chance to unload before the request has been sent.
        const deleteUrl = this.serverUrl + "/ca/streams/" + streamId;
        xhttp.withCredentials = true;
        xhttp.open("DELETE", deleteUrl, false );
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send();
    }

    /**
     * Starts the stream monitoring process.
     *
     * @private
     */
    startStreamMonitoring_()
    {
        const ONE_SECOND_IN_TIMER_UNITS = 1000;
        this.intervalTimer = setInterval( () => {
            if ( this.countdownInSeconds === 0 ) {
        log( "Event source 'stream': creating new...");
        // Set up an asynchronous chain of events that will create a stream
        // then subscribe to it, then start monitoring it. If the heartbeat
        // signal is not seen the process will repeat itself after the
        // heartbeat interval timeout.
        this.createStream_();
        log( "Event source: 'stream' - OK: create event stream task started");
        this.countdownInSeconds = this.streamReconnectIntervalInSeconds;
    }
        this.countdownInSeconds--;
    }, ONE_SECOND_IN_TIMER_UNITS );
    }
    /**
     * Sends a POST request to the Wica Server to create a new stream. Adds a handler to
     * subscribe to the stream once it has been created.
     *
     * @private
     */
    createStream_()
    {
        // Inform listeners that a stream connection attempt is in progress
        this.streamConnect( this.connectionRequestCounter++ );

        // Create a request object which will be used to ask the server to create the new stream.
        const xhttp = new XMLHttpRequest();

        // Add a handler which will print an error message if the stream couldn't be created.
        xhttp.onerror = () => {
        warn( "XHTTP error when sending request to create event source" );
    };

        // Add a handler which will subscribe to the stream once it has been created.
        xhttp.onreadystatechange = () => {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            const streamId = xhttp.responseText;
            log( "Stream created, returned id is: ", streamId );
            const subscribeUrl = this.serverUrl + "/ca/streams/" + streamId;
            this.subscribeStream_( subscribeUrl );
        }
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status !== 200) {
            warn( "Error when sending create stream request." );
        }
    };

        // Now send off the request
        const createUrl = this.serverUrl + "/ca/streams";
        xhttp.withCredentials = true;
        xhttp.open("POST", createUrl, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        const jsonStreamConfiguration = JSON.stringify( this.streamConfiguration );
        xhttp.send( jsonStreamConfiguration );
    }

    /**
     * Sends a GET request to the Wica Server to subscribe to the specified streams.
     * Adds handlers to deal with the various events and/or messages which may be
     * associated with the stream.
     *
     * @private
     * @param subscribeUrl the stream subscription URL.
     */
    subscribeStream_( subscribeUrl )
    {
        const eventSource = new EventSource( subscribeUrl, { withCredentials: true } );

        // The heartbeat message is for internal use of this stream handler.
        // If a heartbeat isn't received periodically then the connection
        // will be deemed to have failed, triggering a new stream creation
        // and subscription cycle.
        eventSource.addEventListener( 'ev-wica-server-heartbeat', ev => {
            if ( this.crossOriginCheckOk_( ev ) ) {
        const id = StreamManager.extractEventSourceStreamIdFromUrl_( ev.target.url );
        log( "Event source: 'wica stream' - heartbeat event on stream with id: " + id );
        this.countdownInSeconds = this.streamTimeoutIntervalInSeconds;
    }
    }, false) ;

        eventSource.addEventListener( 'ev-wica-channel-metadata',ev => {
            if ( this.crossOriginCheckOk_( ev ) ) {
        const metadataArrayObject = parse$1( ev.data );
        this.channelMetadataUpdated( metadataArrayObject );
    }

    }, false);

        eventSource.addEventListener( 'ev-wica-channel-value', ev => {
            if ( this.crossOriginCheckOk_( ev ) ) {
        const valueArrayObject = parse$1( ev.data );
        this.channelValuesUpdated( valueArrayObject );
    }
    }, false);

        eventSource.addEventListener( 'open', ev => {
            if ( this.crossOriginCheckOk_( ev ) ) {
        const id = StreamManager.extractEventSourceStreamIdFromUrl_( ev.target.url );
        this.streamOpened( id );
        log( "Event source: 'wica stream' - open event on stream with id: " + id );
        this.activeStreamId = id;
    }
    }, false);

        eventSource.addEventListener( 'error', ev => {
            if ( this.crossOriginCheckOk_( ev ) ) {
        const id = StreamManager.extractEventSourceStreamIdFromUrl_( ev.target.url );
        warn("Event source: 'wica stream'  - error event on stream with id: " + id );
        ev.target.close();  // close the event source that triggered this message
        this.streamClosed( id );
    }

    }, false);
    }

    /**
     * Performs a CORS check to verify the origin of the supplied event
     * is the same as the origin of the page that is currently loaded.
     *
     * @private
     * @param event the event to check
     * @returns boolean result, true when the check is ok.
     */
    crossOriginCheckOk_( event )
    {
        if ( ! this.crossOriginCheckEnabled ) {
            return true;
        }

        const expectedOrigin = location.origin;
        if ( event.origin === expectedOrigin ) {
            return true;
        }
        else {
            warn( "Event source: 'stream' unexpected event origin." );
            return false;
        }
    }

    /**
     * Extracts the last part of the url which is expected to contain the stream id.
     *
     * @private
     * @param url
     * @returns {string}
     */
    static extractEventSourceStreamIdFromUrl_( url )
    {
        return url.substr( url.lastIndexOf( "/" ) + 1 );
    }
}

/**
 * Provides helper functions for wica-aware html pages.
 * @module
 */

/*- Script Execution Starts Here ---------------------------------------------*/

log( "Executing script in document-utils.js module...");

/**
 * Finds all "wica-aware" HTML elements in the current document. That's to say, all elements
 * which include an attribute which defines the name of the wica channel.
 *
 * @returns {NodeListOf<Element>} - The result list.
 */
function findWicaElements()
{
    return findWicaElementsWithAttributeNameAlsoInShadowDom( document, WicaElementConnectionAttributes.channelName );
}

/**
 * Finds all wica-aware HTML elements in the current document whose attribute name
 * matches the specified value.
 *
 * @param {ParentNode} parentNode - the node at which to start searching.
 * @param {!string} attributeName - The attribute name to target.
 * @returns {NodeListOf<Element>} - The result list.
 */
function findWicaElementsWithAttributeNameAlsoInShadowDom( parentNode, attributeName )
{
    const selector = "[" + attributeName + "]";
    const nodesInParent = parentNode.querySelectorAll( selector );
    let nodesInChildren = [];
    Array.from( parentNode.querySelectorAll('*') )
        .filter( element => element.shadowRoot )
.forEach( element => {
    const nodesInChild = findWicaElementsWithAttributeNameAlsoInShadowDom( element.shadowRoot, attributeName );
    const nodesInChildAsArray = Array.from( nodesInChild );
    nodesInChildren = nodesInChildren.concat( nodesInChildAsArray );
});

    return [ ...nodesInParent, ...nodesInChildren ];
}
/**
 * Finds all wica-aware HTML elements in the current document with the specified wica channel name.
 *
 * @param {!string} channelName - The channel name to search for.
 * @returns {NodeListOf<Element>} - The result list.
 */
function findWicaElementsWithChannelName( channelName )
{
    return findWicaElementsWithAttributeValueAlsoInShadowDom( document, WicaElementConnectionAttributes.channelName, channelName );
}

/**
 * Finds all wica-aware HTML elements in the current document whose attribute name
 * matches the specified value.
 *
 * @param {ParentNode} parentNode - the node at which to start searching.
 * @param {!string} attributeName - The attribute name to target.
 * @param {!string} attributeValue - The attribute value to target.
 * @returns {Array<Element>} - The result list.
 */
function findWicaElementsWithAttributeValueAlsoInShadowDom( parentNode, attributeName, attributeValue )
{
    const selector = "*[" + attributeName + " = \"" + attributeValue + "\"]";
    const nodesInParent = parentNode.querySelectorAll( selector );

    let nodesInChildren = [];
    Array.from( parentNode.querySelectorAll('*') )
        .filter( element => element.shadowRoot)
.forEach( element => {
    const nodesInChild = findWicaElementsWithAttributeValueAlsoInShadowDom( element.shadowRoot, attributeName, attributeValue );
    const nodesInChildAsArray = Array.from( nodesInChild );
    nodesInChildren = nodesInChildren.concat( nodesInChildAsArray );
});

    return  [ ...nodesInParent, ...nodesInChildren ];
}

/**
 * Provides support for updating the current document with live information from the data sources on the backend.
 * @module
 */


/*- Script Execution Starts Here ---------------------------------------------*/

log( "Executing script in document-stream-connector.js module...");

/**
 * Provides real-time updates to wica-aware elements in the current document based on information streamed
 * from the Wica server on the backend.
 */
class DocumentStreamConnector
{
    /**
     * Constructs a new instance to work with the specified backend server.
     *
     * The returned object will remain in a dormant state until triggered by a call to the
     *     {@link module:document-stream-connector.DocumentStreamConnector#activate activate} method.
     *
     * @param {!string} streamServerUrl - The URL of the backend server from whom information is to be obtained.
     *
     * @param {!WicaStreamProperties} streamProperties - The properties of the stream that will be created to
     *     obtain the required information from the data sources.
     *     See {@link module:shared-definitions~WicaStreamProperties WicaStreamProperties}.
     *
     * @param {!WicaElementConnectionAttributes} wicaElementConnectionAttributes - The names of the wica-aware
     *     element attributes that are to be used in the communication process.
     *     See {@link module:shared-definitions~WicaElementConnectionAttributes WicaElementConnectionAttributes}.
     */
    constructor( streamServerUrl, streamProperties, wicaElementConnectionAttributes )
    {
        this.streamServerUrl = streamServerUrl;
        this.streamProperties = streamProperties;
        this.wicaElementConnectionAttributes = wicaElementConnectionAttributes;
        this.lastOpenedStreamId = 0;
        this.streamConnectionHandlers = {};
        this.streamMessageHandlers = {};
    }

    /**
     * Scans the current document for wica-aware elements, creates a stream on the Wica backend server to obtain
     * information for each element's data source, sets up handlers to update each element's attributes on
     * the basis of the received information.
     *
     * See also: {@link module:document-stream-connector.DocumentStreamConnector#shutdown shutdown}.
     */
    activate()
    {
        this.configureStreamConnectionHandlers_( this.wicaElementConnectionAttributes.streamState );

        this.configureStreamMessageHandlers_( this.wicaElementConnectionAttributes.channelMetadata,
            this.wicaElementConnectionAttributes.channelValueArray,
            this.wicaElementConnectionAttributes.channelValueLatest,
            this.wicaElementConnectionAttributes.channelConnectionState,
            this.wicaElementConnectionAttributes.channelAlarmState );

        this.buildStreamConfiguration_( this.wicaElementConnectionAttributes.channelName, this.wicaElementConnectionAttributes.channelProperties );
        this.createStream_();

        load(() => this.streamManager.activate() );
    }

    /**
     * Shuts down the service offered by this class.
     *
     * See also: {@link module:document-stream-connector.DocumentStreamConnector#shutdown activate}.
     */
    shutdown()
    {
        this.streamManager.shutdown();
    }

    /**
     * Configures the document stream connection handling object to deal with the connection-related events generated
     * by the document's stream manager.
     *
     * @private
     * @param {string} streamConnectionStateAttribute - The attribute whose value is to be updated when the stream
     *     manager connects / is opened / is closed.
     */
    configureStreamConnectionHandlers_( streamConnectionStateAttribute )
    {
        this.streamConnectionHandlers.streamConnect = (count) => {
        log( "Event stream connect: " + count );
        log( "Setting wica stream state on all html elements to: 'connect-" + count + "'" );
        findWicaElements().forEach(element => element.setAttribute( streamConnectionStateAttribute, "connect-" + count ) );
    };

        this.streamConnectionHandlers.streamOpened = (id) => {
        log( "Event stream opened: " + id);
        log( "Setting wica stream state on all html elements to: 'opened-" + id + "'" );
        findWicaElements().forEach(element => element.setAttribute( streamConnectionStateAttribute, "opened-" + id));
        this.lastOpenedStreamId = id;
    };

        this.streamConnectionHandlers.streamClosed = (id) => {
        log("Event stream closed: " + id);
        if ( id === this.lastOpenedStreamId ) {
            log("Setting wica stream state on all html elements to: 'closed'");
            findWicaElements().forEach(element => element.setAttribute( streamConnectionStateAttribute, "closed-" + id));
        } else {
            log("Wica stream state on all html elements will be left unchanged as a newer event source is already open !");
        }
    };
    }

    /**
     * Configures the document stream connection handling object to deal with the message-related events generated
     * by the document's stream manager.

     * @param {string} channelMetadataAttribute
     * @param {string} channelValueArrayAttribute
     * @param {string} channelValueLatestAttribute
     * @param {string} channelConnectionStateAttribute
     * @param {string} channelAlarmStateAttribute
     * @private
     */
    configureStreamMessageHandlers_( channelMetadataAttribute, channelValueArrayAttribute,
                                     channelValueLatestAttribute, channelConnectionStateAttribute,
                                     channelAlarmStateAttribute )
    {
        this.streamMessageHandlers.channelMetadataUpdated = metadataMap => {
        this.updateDocumentMetadataAttributes_( metadataMap, channelMetadataAttribute);
    };

        this.streamMessageHandlers.channelValuesUpdated = valueMap => {
        this.updateDocumentValueAttributes_( valueMap, channelValueArrayAttribute, channelValueLatestAttribute,
            channelConnectionStateAttribute, channelAlarmStateAttribute);
    };
    }

    /**
     * Creates the stream based on the wica-aware elements in the current document.
     *
     * @private
     */
    createStream_()
    {
        // Note the streamReconnectIntervalInSeconds must be > streamTimeoutIntervalInSeconds
        // or multiple connections will occur.
        const streamManagerOptions = {
            streamReconnectIntervalInSeconds: 25,
            streamTimeoutIntervalInSeconds: 20,
            crossOriginCheckEnabled: false,
        };
        this.streamManager = new StreamManager( this.streamServerUrl, this.streamConfiguration, this.streamConnectionHandlers, this.streamMessageHandlers, streamManagerOptions );
    }

    /**
     * Builds the stream configuration based on the wica-aware elements in the current document.
     *
     * @private
     * @param channelNameAttribute
     * @param channelPropertiesAttribute
     */
    buildStreamConfiguration_( channelNameAttribute, channelPropertiesAttribute )
    {
        // Look for all wica-aware elements in the current page
        const wicaElements = findWicaElements();
        info( "Number of wica-aware elements found in document: ", wicaElements.length );

        // Create an array of the associated channel names
        const channels = [];
        wicaElements.forEach(function (widget)
        {
            const channelName = widget.getAttribute( channelNameAttribute );
            if ( widget.hasAttribute( channelPropertiesAttribute ) )
            {
                const channelProps = widget.getAttribute( channelPropertiesAttribute );
                const channelConfiguration = { "name": channelName, "props": parse$1( channelProps ) };
                channels.push( channelConfiguration );
            }
            else
            {
                const channelConfiguration = { "name": channelName };
                channels.push( channelConfiguration );
            }
        });

        this.streamConfiguration = { "channels": channels, "props": this.streamProperties };
    }


    /**
     * Handles the arrival of a new metadata map from the stream-manager.
     *
     * @private
     * @param metadataMap
     * @param channelMetadataAttribute
     */
    updateDocumentMetadataAttributes_( metadataMap, channelMetadataAttribute )
    {
        trace("Event stream received new channel metadata map.");

        // Go through all the elements in the update object and assign each element's metadata to
        // the element's metadata attribute.
        Object.keys( metadataMap ).forEach((key) => {
            const channelName = key;
        const channelMetadata = metadataMap[key];
        const elements = findWicaElementsWithChannelName( channelName );
        const metadataAsString = stringify$1(channelMetadata);
        elements.forEach(ele => {
            ele.setAttribute( channelMetadataAttribute, metadataAsString);
        log( "Metadata updated on channel: '" + key + "', new value: '" + metadataAsString + "'" );
    });
    });
    }

    /**
     * Handles the arrival of a new value map from the stream manager.
     *
     * @private
     * @param valueMap
     * @param channelValueArrayAttribute
     * @param channelValueLatestAttribute
     * @param channelConnectionStateAttribute
     * @param channelAlarmStateAttribute
     */
    updateDocumentValueAttributes_( valueMap, channelValueArrayAttribute, channelValueLatestAttribute,
                                    channelConnectionStateAttribute, channelAlarmStateAttribute )
    {
        trace( "WicaStream received new channel value map.");

        // Go through all the elements in the update object and assign each element's value information
        // to the relevant element attributes.
        Object.keys( valueMap).forEach((key) => {
            const channelName = key;
        const channelValueArray = valueMap[key];
        const elements = findWicaElementsWithChannelName( channelName );
        const channelValueArrayAsString = stringify$1( channelValueArray );

        if (!Array.isArray( channelValueArray )
        ) {
            warn("Stream Error: not an array !");
            return;
        }
        const channelValueLatest = channelValueArray.pop();
        const channelValueLatestAsString = stringify$1(channelValueLatest);
        const channelConnectionState = (channelValueLatest.val === null) ? "disconnected" : "connected";
        elements.forEach(ele => {
            ele.setAttribute( channelValueArrayAttribute, channelValueArrayAsString);
        ele.setAttribute( channelValueLatestAttribute, channelValueLatestAsString);
        ele.setAttribute( channelConnectionStateAttribute, channelConnectionState);
        ele.setAttribute( channelAlarmStateAttribute, channelValueLatest.sevr);
        log( "Value updated on channel: '" + key + "', new value: '" + channelValueLatestAsString + "'" );
    });
    });
    }

}

/**
 * Provides support for rendering the textual content of wica-aware elements in the current document.
 * @module
 */


/*- Script Execution Starts Here ---------------------------------------------*/

log( "Executing script in document-text-renderer.js module...");

/**
 * The default precision to be used when rendering a wica-aware widget's text content with a numeric value.
 */
const DEFAULT_PRECISION = 8;

/**
 * Renders the visual state of wica-aware elements in the current document based on attribute information
 * obtained from the Wica server on the backend.
 */
class DocumentTextRenderer
{
    /**
     * Constructs a new instance.
     *
     * @param {!WicaElementConnectionAttributes} wicaElementConnectionAttributes - The names of the wica-aware
     *     element attributes that are to be used in the communication process.
     *     See {@link module:shared-definitions~WicaElementConnectionAttributes WicaElementConnectionAttributes}.
     *
     * @param {!WicaElementRenderingAttributes} wicaElementRenderingAttributes - The names of the wica-aware
     *     element attributes that are to be used in the rendering process.
     *     See {@link module:shared-definitions~WicaElementRenderingAttributes WicaElementRenderingAttributes}.
     */
    constructor( wicaElementConnectionAttributes, wicaElementRenderingAttributes,  )
    {
        this.wicaElementConnectionAttributes= wicaElementConnectionAttributes;
        this.wicaElementRenderingAttributes = wicaElementRenderingAttributes;
    }

    /**
     * Starts periodically scanning the current document and updating the text content of all wica-aware
     * elements to match the information obtained from the wica server.
     *
     * @param {number} [refreshRateInMilliseconds=100] - The period to wait after each update scan before
     *     starting the next one.
     *
     * See also: {@link module:document-text-renderer.DocumentTextRenderer#shutdown shutdown}.
     */
    activate( refreshRateInMilliseconds = 100 )
    {
        // Start update process if not already active. Otherwise do nothing.
        if ( this.intervalTimer === undefined )
        {
            load( () => this.doScan_( refreshRateInMilliseconds ) );
        }
    }

    /**
     * Shuts down the service offered by this class.
     *
     * See also: {@link module:document-text-renderer.DocumentTextRenderer#activate activate}.
     */
    shutdown()
    {
        // Stop update process if already active. otherwise do nothing.
        if ( this.intervalTimer !== undefined )
        {
            clearInterval( this.intervalTimer );
            this.intervalTimer = undefined;
        }
    }


    /**
     * Performs a single update cycle, then schedules the next one.
     *
     * @private
     * @param {number} refreshRateInMilliseconds - The period to wait after every update scan before starting
     *     the next one.
     *

     */
    doScan_( refreshRateInMilliseconds )
    {
        try
        {
            this.renderWicaElements_( this.wicaElementConnectionAttributes.channelName,
                this.wicaElementConnectionAttributes.channelMetadata,
                this.wicaElementConnectionAttributes.channelValueArray,
                this.wicaElementRenderingAttributes.tooltip,
                this.wicaElementRenderingAttributes.renderingProperties );
        }
        catch( err )
        {
            DocumentTextRenderer.logExceptionData_("Programming Error: renderWicaElements_ threw an exception: ", err );
        }

        // Reschedule next update
        this.intervalTimer = setTimeout(() => this.doScan_( refreshRateInMilliseconds ), refreshRateInMilliseconds );
    }


    /**
     * Renders all wica-aware html elements in the current document.
     *
     * @private
     * @param {string} channelNameAttribute - The name of the attribute which holds the channel name.
     * @param {string} channelMetadataAttribute - The name of the attribute which holds the channel metadata.
     * @param {string} channelValueArrayAttribute - The name of the attribute which holds channel value array.
     * @param {string} tooltipAttribute - The name of the attribute which holds the tooltip.
     * @param {string} renderingPropertiesAttribute - The name of the attribute which holds the properties
     *     needed for rendering.
     */
    renderWicaElements_( channelNameAttribute, channelMetadataAttribute, channelValueArrayAttribute, tooltipAttribute, renderingPropertiesAttribute )
    {
        findWicaElements().forEach((element) =>
        {
            // Always ensure the element's tooltips are available for rendering.
            DocumentTextRenderer.configureWicaElementToolTip_( element, tooltipAttribute, channelNameAttribute );

        // Get the element's rendering properties object if available
        // Note: since this attribute is configured by the user as a JSON string it's important
        // to validate the data and to output some diagnostic message if there is a problem.
        const renderingProperties = DocumentTextRenderer.getRenderingProperties( element, renderingPropertiesAttribute, channelNameAttribute );

        // Bail out if rendering is disabled for this widget
        const disableRendering = {}.hasOwnProperty.call( renderingProperties, "disable" ) ? renderingProperties.disable : false;
        if ( disableRendering )
        {
            return;
        }

        // Bail out if the channel's metadata and current value are not both available
        if ( ( ! element.hasAttribute( channelMetadataAttribute ) ) || ( ! element.hasAttribute( channelValueArrayAttribute ) ) )
        {
            return;
        }

        // Get the channel value object
        const channelValueArray = parse$1( element.getAttribute( channelValueArrayAttribute ) );

        // Bail out if the value obtained from the stream was not an array
        if ( ! Array.isArray( channelValueArray ) )
        {
            warn("Stream error: received value object that was not an array !");
            return;
        }

        // Bail out if there isn't at least one value present.
        if ( channelValueArray.length === 0 )
        {
            return;
        }

        // Bail out if the latest value indicates that the channel is offline.
        const channelValueLatest = channelValueArray.pop();
        if ( channelValueLatest.val === null )
        {
            return;
        }

        // Get the channel metadata object
        const channelMetadata = parse$1( element.getAttribute( channelMetadataAttribute ) );

        // Now render the widget's text content
        DocumentTextRenderer.renderWicaElementTextContent_( element, channelMetadata, channelValueLatest, renderingProperties );
    });
    }

    /**
     * Renders the element's textual content.
     *
     * @private
     * @param {Element} element - The element.
     * @param {WicaChannelMetadata} channelMetadata - the channel's metadata.
     * @param {WicaChannelValue} channelValueLatest - the channel's latest value.
     * @param {WicaRenderingProperties} renderingProperties - the channel's rendering properties.
     */
    static renderWicaElementTextContent_( element, channelMetadata, channelValueLatest, renderingProperties )
    {
        const rawValue = channelValueLatest.val;

        // The renderer assigns units either from either the rendering properties "units" field if
        // available or from the metadata "egu" field if available. Otherwise it assigns blank.
        const units = {}.hasOwnProperty.call( renderingProperties, "units" ) ? renderingProperties.units :
            {}.hasOwnProperty.call( channelMetadata, "egu" ) ? channelMetadata.egu : "";

        switch ( channelMetadata.type )
        {
            case "REAL_ARRAY":
            case "INTEGER_ARRAY":
            case "STRING_ARRAY":
                element.textContent = stringify$1( rawValue );
                break;

            case "REAL": {
                const useExponentialFormat = {}.hasOwnProperty.call(renderingProperties, "exp") ? renderingProperties.exp : false;
                const precision = Math.min({}.hasOwnProperty.call(renderingProperties, "prec") ? renderingProperties.prec : channelMetadata.prec, DEFAULT_PRECISION);
                // TODO: Look at improved deserialisation of NaN's, Infinity etc
                // TODO: The backend serialiser has been changed (2019-02-02) to the more rigorous implementation of
                // TODO: sending Nan and Infinity as numbers not strings. Need to check whether the implementation
                // TODO: here still works.
                if ((rawValue === "Infinity") || (rawValue === "NaN")) {
                    // This was required in earlier versions of the backend server where Infinity
                    // and Nan was sent as a JSON string. Since 2019-02-02 should no longer be required.
                    warn("Programming error: unexpected JSON String format for numeric value of NaN or Infinity.");
                    element.textContent = rawValue;
                } else if (useExponentialFormat) {
                    element.textContent = rawValue.toExponential(useExponentialFormat) + " " + units;
                } else {
                    element.textContent = rawValue.toFixed(precision) + " " + units;
                }
                break;
            }

            case "INTEGER":
                // TODO: Look at improved deserialisation of NaN's, Infinity etc
                // TODO: The backend serialiser has been changed (2019-02-02) to the more rigorous implementation of
                // TODO: sending Nan and Infinity as numbers not strings. Need to check whether the implementation
                // TODO: here still works.
                if ( rawValue === "Infinity" )
                {
                    // This was required in earlier versions of the backend server where Infinity
                    // and Nan was sent as a JSON string. Since 2019-02-02 should no longer be required.
                    warn( "Programming error: unexpected JSON String format for numeric value of NaN or Infinity." );
                    element.textContent = rawValue;
                }
                else
                {
                    element.textContent = rawValue + " " + units;
                }
                break;

            case "STRING":
                element.textContent = rawValue;
                break;

            default:
                element.textContent = rawValue;
                break;
        }

    }

    /**
     * Configure the element's tooltip attribute.
     *
     * @implNote
     *
     * The wica CSS rules ensure that when the browser's cursor hovers over the element of interest a
     * a window will be automatically popped up to display the contents of the string specified by the
     * element's tooltip attribute.
     *
     * The implementation here does nothing if the tooltip attribute has already been set explicitly in
     * the HTML document and if the set value matches the channel name. If this condition is not met
     * then the tooltipAttribute value is copied from the channelNameAttribute.
     *
     * @param {Element} element - The element.
     * @param {string} tooltipAttribute - The name of the attribute which contains the tooltip.
     * @param {string} channelNameAttribute - The name of the attribute which contains the channel name.
     * @private
     */
    static configureWicaElementToolTip_( element, tooltipAttribute, channelNameAttribute )
    {
        const channelName = element.getAttribute( channelNameAttribute );
        if ( ( ! element.hasAttribute( tooltipAttribute ) ) || ( element.getAttribute( tooltipAttribute ) !== channelName ) )
        {
            element.setAttribute( tooltipAttribute, channelName );
        }
    }

    /**
     * Attempts to return a JS WicaRenderingProperties object using the JSON string that may optionally
     * be present in the element's rendering properties attribute.
     *
     * @private
     * @param {Element} element - The element.
     * @param {string} renderingPropertiesAttribute - The name of the element's HTML attribute which
     *      contains the rendering properties.
     * @param {string} channelNameAttribute - The name of the attribute which contains the channel name.
     * @return {WicaRenderingProperties} - the object, or {} if for any reason it cannot be obtained
     *     from the element's HTML attribute.
     */
    static getRenderingProperties( element, renderingPropertiesAttribute, channelNameAttribute )
    {
        const channelName = element.getAttribute( channelNameAttribute );
        const renderingPropertiesString = element.hasAttribute( renderingPropertiesAttribute ) ? element.getAttribute( renderingPropertiesAttribute ) : "{}";
        try
        {
            return parse$1( renderingPropertiesString );
        }
        catch( err )
        {
            DocumentTextRenderer.logExceptionData_( channelName + ": Illegal JSON format in '" + renderingPropertiesAttribute + "' attribute.\nDetails were as follows:\n", err);
            return {};
        }
    }

    /**
     * Log any error data generated in this class.
     *
     * @private
     * @param {string} msg - custom error message.
     * @param {Error} err - the Error object
     */
    static logExceptionData_( msg, err )
    {
        let vDebug = "";
        for ( const prop in err )
        {
            if ( {}.hasOwnProperty.call( err, prop ) )
            {
                vDebug += "property: " + prop + " value: [" + err[ prop ] + "]\n";
            }
        }
        vDebug += "Details: [" + err.toString() + "]";
        warn( msg + vDebug );
    }

}

/**
 * Provides support for firing custom notification events on wica-aware elements in the current document to
 * update interested third-parties on the latest status received from the wica event stream.
 *
 * @module
 */


/*- Script Execution Starts Here ---------------------------------------------*/

log( "Executing script in document-event-manager.js module...");

/**
 * Provides a type definition for a JS CustomEvent object that is fired to inform observers of the
 * latest metadata and value information received on a wica-aware element.
 *
 * @typedef module:document-event-manager.OnWicaEvent
 *
 * @property {Object} target - A reference to the target element on which the event was dispatched.
 *
 * @property {Object} detail - An object providing the customised data payload for the event.
 *
 * @property {string} detail.channelName - The name of the channel associated with the element on which the
 *     event was fired. See {@link module:shared-definitions.WicaChannelName WicaChannelName}.
 *
 * @property {WicaChannelMetadata} detail.channelMetadata - The most recent channel metadata.
 *     See {@link module:shared-definitions.WicaChannelMetadata WicaChannelMetadata}.
 *
 * @property {WicaChannelValue[]} detail.channelValueArray - The latest channel values.
 *     See {@link module:shared-definitions.WicaChannelValue WicaChannelValue}.
 *
 * @property {WicaChannelValue} detail.channelValueLatest - The most recent channel value.
 *     See {@link module:shared-definitions.WicaChannelValue WicaChannelValue}.
 */

/**
 * Provides support for periodically scanning the current document for wica-aware elements with attached
 * event handlers or event listeners. Fires a custom {@link module:document-event-manager.OnWicaEvent
 * OnWicaEvent} to inform the attached observers of the latest status received from the wica event
 * stream.
 */
class DocumentEventManager
{
    /**
     * Constructs a new instance.
     *
     * @param {!WicaElementConnectionAttributes} wicaElementConnectionAttributes - The names of the wica-aware
     *     element attributes that can be examined to determine the name of the channel and its current status.
     *     See {@link module:shared-definitions~WicaElementConnectionAttributes WicaElementConnectionAttributes}.
     *
     * @param {!WicaElementEventAttributes} wicaElementEventAttributes - The names of the wica-aware
     *     element attributes that can be examined to determine whether a wica-aware element has any attached handlers.
     *     See {@link module:shared-definitions~WicaElementEventAttributes WicaElementEventAttributes}.
     *
     * @implNote
     *
     * It is currently (2019-01-29) impossible to optimise the firing of events to trigger them only on elements
     * with attached event listeners. This is because it is impossible to detect programmatically the presence
     * of attached event listeners.
     */
    constructor( wicaElementConnectionAttributes, wicaElementEventAttributes )
    {
        this.wicaElementConnectionAttributes = wicaElementConnectionAttributes;
        this.wicaElementEventAttributes = wicaElementEventAttributes;
    }

    /**
     * Starts periodically scanning the current document and firing events on all wica-aware elements
     * to publish their current state.
     *
     * The event that will be published is a 'onwica'
     *
     * @param {number} [refreshRateInMilliseconds=200] - The period to wait after each document scan before
     *     starting the next one.
     *
     * @param {boolean} [supportEventListeners=false] - Determines whether events are fired ONLY on elements which
     *     have defined event handlers or whether they are fired unconditionally on all elements (as is required to
     *     support any attached event listeners).
     *
     * See also: {@link module:document-event-manager.DocumentEventManager#shutdown shutdown}.
     */
    activate( refreshRateInMilliseconds = 100, supportEventListeners = true )
    {
        // Start update process if not already active. Otherwise do nothing.
        if ( this.intervalTimer === undefined )
        {
            try
            {
                this.supportEventListeners = supportEventListeners;
                this.doScan_( refreshRateInMilliseconds );
            }
            catch (err)
            {
                DocumentEventManager.logExceptionData_("Programming Error: fireEvents threw an exception: ", err);
            }
        }
    }

    /**
     * Shuts down the service offered by this class.
     *
     * See also: {@link module:document-event-manager.DocumentEventManager#activate activate}.
     */
    shutdown()
    {
        // Stop update process if already active. otherwise do nothing.
        if (this.intervalTimer !== undefined)
        {
            clearInterval(this.intervalTimer);
            this.intervalTimer = undefined;
        }
    }

    /**
     * Performs a single update cycle, then schedules the next one.
     *
     * @private
     * @param {number} refreshRateInMilliseconds - The period to wait after every update scan before starting the next one.
     */
    doScan_( refreshRateInMilliseconds )
    {
        try
        {
            this.fireEvents_( this.wicaElementConnectionAttributes.channelName,
                this.wicaElementConnectionAttributes.channelMetadata,
                this.wicaElementConnectionAttributes.channelValueArray,
                this.wicaElementEventAttributes.eventHandler,
                this.supportEventListeners );
        }
        catch( err )
        {
            DocumentEventManager.logExceptionData_( "Programming Error: fireEvents_ threw an exception: ", err );
        }

        // Reschedule next update
        this.intervalTimer = setTimeout(() => this.doScan_( refreshRateInMilliseconds ), refreshRateInMilliseconds );
    }

    /**
     * Fires a custom {@link module:document-event-manager.OnWicaEvent OnWicaEvent} on all wica-aware elements in the
     * current document to inform any attached event handlers or event listeners of the latest state.
     *
     * The event payload includes the most recently received stream notification information for the wica channel's
     * metadata and wica channel's value.
     *
     * No events will be fired until both the channel's metadata and value have been obtained.
     *
     * @private
     *
     * @param {string} channelNameAttribute - The name of the attribute which holds the channel name.
     * @param {string} channelMetadataAttribute - The name of the attribute which holds the channel metadata.
     * @param {string} channelValueArrayAttribute - The name of the attribute which holds the channel value array.
     * @param {string} eventHandlerAttribute - The name of the attribute which determines whether an element has
     *    a defined event handler.
     * @param {boolean} supportEventListeners - Whether events are to be fired unconditionally to support event
     *     listeners or in a more optimised way which supports event handlers only.
     */
    fireEvents_( channelNameAttribute, channelMetadataAttribute, channelValueArrayAttribute,
                 eventHandlerAttribute, supportEventListeners )
    {
        findWicaElements().forEach((element) => {

            // If we have no information about the channel's current value or the channel's metadata
            // then there is nothing useful that can be done so bail out.
            if ( (!element.hasAttribute( channelValueArrayAttribute )) || ( !element.hasAttribute( channelMetadataAttribute )))
        {
            return;
        }

        // Obtain the channel name object
        const channelName = element.getAttribute( channelNameAttribute );

        // Obtain the channel metadata object
        const channelMetadata = parse$1( element.getAttribute(channelMetadataAttribute ));

        // Obtain the object containing the array of recently received channel values.
        const channelValueArray = parse$1( element.getAttribute( channelValueArrayAttribute ));

        // Check that the received value object really was an array
        if (!Array.isArray( channelValueArray )) {
            warn("Stream error: received value object was not an array !");
            return;
        }

        // If there isn't at least one value present bail out as there is nothing useful to be done
        if ( channelValueArray.length === 0 ) {
            return;
        }

        // If an onchange event handler IS defined then dispatch an onchange event to trigger
        // the handler.
        if ( typeof element[ eventHandlerAttribute ] == "function" ) {
            const event = new Event('change');
            event.channelName = channelName;
            event.channelMetadata = channelMetadata;
            event.channelValueArray = channelValueArray;
            event.channelValueLatest = channelValueArray[channelValueArray.length - 1];
            element.dispatchEvent( event );
        }

        // Events are fired unconditionally if event listener support is required.
        if ( supportEventListeners ) {
            const customEvent = new CustomEvent( 'wica', {
                detail: {
                    "channelName": channelName,
                    "channelMetadata": channelMetadata,
                    "channelValueArray": channelValueArray,
                    "channelValueLatest": channelValueArray[channelValueArray.length - 1]
                }
            });
            element.dispatchEvent( customEvent );
        }
    });
    }

    /**
     * Log any error data generated in this class.
     *
     * @private
     * @param {string} msg - custom error message.
     * @param {Error} err - the Error object
     */
    static logExceptionData_( msg, err )
    {
        let vDebug = "";
        for ( const prop in err )
        {
            if ( Object.hasOwnProperty.call( err, prop ) )
            {
                vDebug += "property: " + prop + " value: [" + err[ prop ] + "]\n";
            }
        }
        vDebug += "Details: [" + err.toString() + "]";
        warn( msg + vDebug );
    }
}

/**
 * Loads the services that are required to provide Wica support for the current HTML document.
 * @module
 */

/*- Script Execution Starts Here ---------------------------------------------*/

log( "Executing script in document-support-loader.js module...");

/**
 * Provides the functionality necessary to support a wica-aware html page.
 */
class DocumentSupportLoader
{
    /**
     * Constructs a new instance to work with the specified Wica Server.
     *
     * @param {!string} streamServerUrl - The URL of the Wica Server with whom
     *    this instance should communicate.
     */
    constructor( streamServerUrl )
    {
        this.streamServerUrl = streamServerUrl;
        this.documentStreamConnector = new DocumentStreamConnector( streamServerUrl, WicaStreamProperties, WicaElementConnectionAttributes );
        this.documentTextRenderer = new DocumentTextRenderer( WicaElementConnectionAttributes, WicaElementRenderingAttributes );
        this.documentEventManager = new DocumentEventManager( WicaElementConnectionAttributes, WicaElementEventAttributes );
    }

    /**
     * Activates support for the current document.
     *
     * @param {number} [textRendererRefreshRate=100] - The rate at which the document's text renderer should run to update the
     *     visual state of the document's wica-aware elements.
     *
     * @param {number} [eventManagerRefreshRate=100] - The rate at which the document's event manager should run to fire
     *    notification events on the state of the document's wica-aware elements.
     */
    activate( textRendererRefreshRate = 100, eventManagerRefreshRate = 100 )
    {
        this.loadWicaCSS_();

        load(() => {
            this.documentStreamConnector.activate();
        this.documentTextRenderer.activate( textRendererRefreshRate );
        this.documentEventManager.activate( eventManagerRefreshRate );
    });
    }

    /**
     * Shuts down support for the current document.
     */
    shutdown()
    {
        this.documentStreamConnector.shutdown();
        this.documentTextRenderer.shutdown();
        this.documentEventManager.shutdown();
    }

    /**
     * Loads the CSS that is used to render the visual state of wica-aware elements
     * using information in the element's attributes.
     * @private
     */
    loadWicaCSS_()
    {

        // This mechanism ensures that the Wica CSS file is loaded only once.
        if ( !document.getElementById('wica-css-id') )
        {
            const head = document.getElementsByTagName('head')[0];
            const link = document.createElement('link');
            link.id = 'wica-css-id';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href =   this.streamServerUrl + '/wica/wica.css' ;
            link.media = 'all';
            head.appendChild(link);
        }
    }

}

/**
 * Provides support for buffering the information received from the document's wica event stream.
 *
 * @module
 */

/**
 * Provides a facility to buffer the received information for one or more wica-aware elements,
 * subsequently making it available to third-parties who may wish to poll for it.
 */

/*- Script Execution Starts Here ---------------------------------------------*/

log( "Executing script in plot-buffer.js module...");

class PlotBuffer
{

    /**
     * Constructs a new instance based on the specified DOM elements and buffer size.
     *
     * @param {string[]} htmlElementIds the names of the elements to listen to.
     *
     * @param maximumBufferSize the number of entries that will be buffered. Beyond
     *     this limit the oldest values will be silently thrown away.
     */
    constructor(  htmlElementIds, maximumBufferSize = 32 )
    {
        this.htmlElementIds = htmlElementIds;
        this.maximumBufferSize = maximumBufferSize;
        this.htmlElements = [];
        this.metadataMap = {};
        this.valueMap = {};

        // TODO: Check here that element exists and that is is data-aware
        for ( const htmlElementId of this.htmlElementIds )
        {
            const ele = document.getElementById( htmlElementId );
            if ( ele !== null )
            {
                if ( ele.hasAttribute( WicaElementConnectionAttributes.channelName ) )
                {
                    const channelName = ele.getAttribute( WicaElementConnectionAttributes.channelName );
                    this.valueMap[ channelName ]= [];
                    this.htmlElements.push( ele );
                }
                else
                {
                    warn( "One or more element ID's did not correspond to a wica-aware element" );
                }
            }
            else
            {
                warn( "One or more element ID's were not found " );
            }
        }

        this.observer = new MutationObserver(( mutationList ) => this.mutationHandler_( mutationList ) );
    }

    /**
     * Activate the plot buffer to receive information for the elements specified in the constructor.
     */
    activate()
    {
        const mutationObserverOptions = { subtree: false,
            childList: false,
            attributes: true,
            attributeFilter: [ WicaElementConnectionAttributes.channelMetadata,
                WicaElementConnectionAttributes.channelValueArray ] };
        for ( const htmlElement of this.htmlElements )
        {
            this.observer.observe( htmlElement, mutationObserverOptions );
        }
    }

    /**
     * Deactivates the plot buffer. No further information will be added but existing
     * data will be preserved.
     */
    shutdown()
    {
        this.observer.disconnect();
    }

    /**
     * Returns an indication of whether the connection to the server has been established.
     *
     * @returns {boolean}
     */
    isConnectedToServer()
    {
        // Scan through all elements and check that the stream state is shown as opened
        for ( const ele of this.htmlElements )
        {
            if ( ele.hasAttribute( WicaElementConnectionAttributes.streamState ) )
            {
                const streamState = ele.getAttribute( WicaElementConnectionAttributes.streamState );
                if ( ! streamState.includes( "opened-") )
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        return true;
    }

    /**
     * Returns an indication of whether data has been received from ALL the data
     * sources in the stream.
     *
     * - at least one stream metadata object has been received.
     * - at least one stream value object has been received.
     * - at least one value has been received for every channel in the stream.
     *
     * @returns {boolean}
     */
    isDataAvailable()
    {
        if ( Object.values( this.metadataMap ).length === 0 )
        {
            return false;
        }

        if ( Object.values( this.valueMap ).length === 0 )
        {
            return false;
        }

        for ( const channelValueArray of Object.values( this.valueMap ) )
        {
            if ( channelValueArray.length === 0)
            {
                return false;
            }
            else if ( channelValueArray[ channelValueArray.length - 1 ].val === null  )
            {
                return false;
            }
        }
        return true;
    }

    /**
     * Returns a map containing the most recently received channel metadata.
     *
     * @return metadataMap - Map of channel names and their associated metadata. See
     *     {@link module:shared-definitions.WicaChannelName WicaChannelName} and
     *     {@link module:shared-definitions.WicaChannelMetadata WicaChannelMetadata}.
     *
     */
    getMetadataMap()
    {
        return this.metadataMap;
    }

    /**
     * Returns a map containing the most recently received channel values.
     *
     * @return valueMap - Map of channel names and array of values that have been received for the channel in
     *     chronological order. See {@link module:shared-definitions.WicaChannelName WicaChannelName} and
     *     {@link module:shared-definitions.WicaChannelValue WicaChannelValue}.
     */
    getValueMap()
    {
        return this.valueMap;
    }

    /**
     * @param mutationList
     * @private
     */
    mutationHandler_( mutationList )
    {
        mutationList.forEach( mutation =>
        {
            if ( mutation.type === "attributes" )
        {
            const element = mutation.target;
            const channelName = element.getAttribute( WicaElementConnectionAttributes.channelName );

            if ( mutation.attributeName === WicaElementConnectionAttributes.channelMetadata )
            {
                const metadataAsJsonString = element.getAttribute( WicaElementConnectionAttributes.channelMetadata );
                const metadata = parse$1( metadataAsJsonString );
                this.metadataMap[ channelName ] = metadata;
            }

            if ( mutation.attributeName === WicaElementConnectionAttributes.channelValueArray )
            {
                const valueArrayAsJsonString = element.getAttribute( WicaElementConnectionAttributes.channelValueArray );
                const valueArray = parse$1( valueArrayAsJsonString );
                this.updateBufferedChannelValues_( channelName, valueArray );
            }

            trace( "Mutation on attribute: '" + mutation.attributeName + "' of wica element: '" + channelName + "'" );
        }
    } );
    }

    /**
     * Captures the most recent value information for a channel, where
     * necessary discarding the oldest data (when the buffer size
     * limit has been reached).
     *
     * @private
     */
    updateBufferedChannelValues_( channelName, channelValueArray )
    {
        // Now add the most recently received channel values
        for ( const channelValue of channelValueArray )
        {
            this.valueMap[ channelName ].push( channelValue );
        }

        // If the previous notification buffer is full throw away the oldest values until
        // it is the right size again.
        while ( this.valueMap[ channelName ].length > this.maximumBufferSize )
        {
            this.valueMap[ channelName ].shift();
        }
    }
}

/**
 * Provides the entrypoint API for leveraging all functionality associated with Wica
 * from the Javascript client side.
 * @module
 */

/*- Script Execution Starts Here ---------------------------------------------*/

log( "Executing script in client-api.js module...");

/**
 * Provides the main entry point for supporting a  Wica-aware document.
 *
 * @module
 */

/*- Script Execution Starts Here ---------------------------------------------*/

// Configure the logging level required for this application.
setLevel( logLevels.WARN );

info( "Wica is loading support for the current document... ");

// Define the server this application is intended to target.
const WICA_OWN_HOST = "https://gfa-wica.psi.ch"

// Create and activate a document support loader for the document
// which loads this library.
const documentSupportLoader = new DocumentSupportLoader( WICA_OWN_HOST );
documentSupportLoader.activate( 200, 200 );

// Attach a handler to shut things down when the browser navigates away.
window.onbeforeunload = () => {
    info( "Wica is shutting down support for the current document..." );
    documentSupportLoader.shutdown();
    info( "Wica unloaded OK." );
};

// Provide a hook for restarting wica support of the current document
function restartDocumentSupportLoader() {
    info( "Wica is restarting support for the current document..." );
    documentSupportLoader.shutdown();
    info( "Wica document support loader was shutdown OK." );
    documentSupportLoader.activate( 200, 200 );
    info( "Wica document support loader was activated OK." );
}
document.wicaRestartDocumentSupportLoader = restartDocumentSupportLoader;

info( "Wica support loaded OK. ");

export { DocumentSupportLoader, PlotBuffer, StreamManager };
//# sourceMappingURL=wica.js.map
