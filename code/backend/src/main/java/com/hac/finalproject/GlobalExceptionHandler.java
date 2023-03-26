package com.hac.finalproject;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(value = Exception.class)
  public ModelAndView defaultErrorHandler(HttpServletRequest request, Exception e) throws Exception {
    ModelAndView modelAndView = new ModelAndView();
    modelAndView.addObject("exception", e);
    modelAndView.addObject("url", request.getRequestURL());
    modelAndView.setViewName("error");
    return modelAndView;
  }
}
