import stream from 'stream';

type Eventually<T> = T | Promise<T>;

export const enum namedLogLevel {
    error = 1,
    warn = 2,
    info = 3
}

export type namedLogLevelName = {
    error: namedLogLevel.error,
    warn: namedLogLevel.warn,
    info: namedLogLevel.info
}

export type logLevel = number | namedLogLevel;


export type Loggable = Eventually<string | Error | { toString(): string}>

export type Logger<name extends string | undefined = undefined> = {
    /** log with info verbosity level */
    info(v?: Loggable): ReturnType<Logger["log"]>
    /** log with error verbosity level */
    error: Logger["info"]
    /** log with warn verbosity level */
    warn: Logger["info"]
    log(l: logLevel, v: Loggable): Logger
    /** log with info verbosity level */
    log(l: namedLogLevel.info): Logger["info"]
    /** log with error verbosity level */
    log(l: namedLogLevel.error): Logger["error"]
    /** log with warn verbosity level */
    log(l: namedLogLevel.warn): Logger["warn"]
    
    /** special case of info declaring completion */
    done(v?: Loggable): Logger["info"]

    /** special case of error declaring failure */
    fatal(v?: Loggable): Logger["error"]

    name: name
}

export type RootTrack = {
    /** returns a new child tracker with the given name */
    <name extends string>(name?: name): Track<name>
}


export type Track<withName extends string | undefined = undefined> = {
    /** returns a new child Track with the given name */
    <name extends string>(name: name): Track<name>

    /** track writes to a stream*/
    <T extends stream.Writable>(v: T): T & Track<withName> & Logger<withName>

    /** track reads from a stream */
    <T extends stream.Readable>(v: T): T & Track<withName> & Logger<withName>


    /** track reads and writes of a stream */
    <T extends stream.Duplex>(v: T): T & Track<withName> & Logger<withName>

    /**
     * Track a function. If the `name` of this track is not specified,
     * this sets it to the name of the function.
     * @param v the function to track
     */
    <T extends (...a: any) => Eventually<any>>(v: T): T & Track<withName> & Logger<withName>
};



const trck: RootTrack = (undefined as any);


trck("users")(() => 1)




const track: RootTrack = 
    <T extends
        ((...a: any) => Eventually<any>) |
        stream.Writable |
        stream.Readable | 
        stream.Duplex
    >(v?: T): T & Logger {
        switch(true) {
        case v instanceof Function: return trackFunction<T>(v);
        case v instanceof stream.Writable: return trackWritable<T>(v);
        case v instanceof stream.Duplex: return trackDuplex<T>(v);
        case v instanceof stream.Readable: return trackReadable<T>(v);
        }
    }

export const TrackManual = 

export function trackFunction<T extends (...a:any) => Eventually<any>>
    (v: T): T {}

export function trackWritable<T extends stream.Writable = stream.Writable>
    (v: T): T {}

export function trackDuplex<T extends stream.Duplex = stream.Duplex>
    (v: T): T {}

export function trackReadable<T extends stream.Readable = stream.Readable>
    (v: T): T {}

const assertNever = 
    (v?: never): asserts v is never => { throw new Error(`unexpected case of ${v}`) }

