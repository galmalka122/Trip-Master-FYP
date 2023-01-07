package com.hac.finalproject.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hac.finalproject.repos.User.User;
import com.hac.finalproject.repos.User.UserService;

@Controller
@RequestMapping("")
public class HomePage {

  @Autowired
  private UserService userService;

  /**
   * This function is typically used to clean up user input in web forms by
   * removing leading and trailing whitespace. It is useful for handling cases
   * where users might accidentally include extra whitespace when filling out a
   * form.
   * 
   * @param binder - binds the form inputs
   */
  @InitBinder
  public void initBinder(WebDataBinder binder) {
    StringTrimmerEditor stringtrimmer = new StringTrimmerEditor(true);
    binder.registerCustomEditor(String.class, stringtrimmer);
  }

  /**
   * Processes a user signup request.
   *
   * @param user The user object containing the signup information.
   * @param bind The binding result object used to check for validation errors.
   * @return A string representing the view to redirect to.
   */
  @PostMapping("signup/proccess")
  public String signupProcess(@Valid User user, BindingResult bind) {

    // Check for validation errors.
    if (bind.hasErrors()) {
      return "redirect:/error";
    }

    // Save the user to the database.
    userService.signup(user);

    // Redirect to the login page.
    return "redirect:/login";
  }

  @PostMapping("login")
  public String loginProcess(@RequestBody String username, @RequestBody String password) {

    return "redirect:/login";

  }

  /**
   * This function handles the main page request.
   *
   * @param model the model object that is used to pass data to the view
   * @return the name of the view template to render
   */
  @GetMapping("")
  public static String main(Model model) {
    return "index";
  }

  /**
   * 
   * Handles the request for the login page.
   * 
   * @param model the model to be passed to the view
   * @return the name of the login view
   */
  @GetMapping("login")
  public String displayLoginPage(Model model) {
    return "login";
  }

  /**
   * 
   * Handles the signup process for a new user.
   * 
   * @param user  The user object containing the new user's information.
   * @param model The model object used to pass data to the view.
   * @return The signup view template.
   */
  @GetMapping("signup")
  public String signup(User user, Model model) {
    return "signup";
  }

}
