/**
 * [WSGI Specification](https://www.python.org/dev/peps/pep-3333/) described using TS
 */

type HeaderEntity = [string, string]

interface ErrType{}
interface Err{}
interface Traceback{}
type ExcInfo = [ErrType, Err, Traceback]


/**
 * Must contain CGI-defined variables + WSGI-defined variables
 * May also contain server-defined variables
 */
interface Environ {
  'REQUEST_METHOD': string,
  'SCRIPT_NAME': string,
  'PATH_INFO': string,
  'QUERY_STRING'?: string,
  'CONTENT_TYPE'?: string,
  /** etc... **/

  'wsgi.version': [number, number],
  'wsgi.url_scheme': "http" | "https",
  /** etc... **/

  'mod_python.some_variable'?: string,
}


/**
 * - It accepts a single parameter: a string to be written as part of the HTTP response body
 * - It is returned by the `start_response()` callable
 */
interface Write {
  (data: string): void
}


/**
 * - The `status` argument is an HTTP "status" string like "200 OK" or "404 Not Found"
 * - The `response_headers` argument is a list of `(header_name, header_value)` tuples
 * - The `exc_info argument`, if supplied, must be a `sys.exc_info()` tuple
 * - It must return a `write(body_data)` callable
 */
interface StartResponse {
  (status: string, response_headers: HeaderEntity[], exc_info?: ExcInfo): Write
}


/**
 * - An application __must__ return an iterable object
 */
interface WSGIApplication {
  (environ: Environ, start_response: StartResponse): Iterable<string>
}

